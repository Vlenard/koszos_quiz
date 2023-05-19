import { Accessor, InitializedResource, Match, ParentComponent, Resource, Setter, Switch, createContext, createResource, createSignal, useContext } from "solid-js";
import { readTextFile } from "@tauri-apps/api/fs";
import { resolveResource } from "@tauri-apps/api/path";
import { Platform, platform } from "@tauri-apps/api/os";
import { appWindow }  from "@tauri-apps/api/window";
import DarwinTitlebar from "../Titlebars/DarwinTitlebar";
import Theme from "../types/Theme";
import Lang from "../types/Lang";
import { Transition } from "solid-transition-group";
import Settings from "../settings/Settings";
import "./Preference.css";

type PreferenceContext = {
    theme: Resource<Theme>;
    lang: InitializedResource<any>;
    language: Accessor<Lang>;
    toggleTheme: () => void;
    setLanguage: Setter<Lang>;
    toggleSettings: () => void;
};

const Context = createContext<PreferenceContext>();

const getPlatform = async (): Promise<Platform> => {
    return await platform();
};

const getTheme = async (): Promise<Theme> => { 
    const theme: Theme = await appWindow.theme() as Theme; 
    document.documentElement.classList.add(theme);
    return theme;
};

const getLangPackage = async (lang: Theme): Promise<any> => {
    const resourcePath = await resolveResource(`lang/${lang}.json`);
    const langPackage = JSON.parse(await readTextFile(resourcePath));
    return langPackage;
};

const Preference: ParentComponent = (props) => {

    const [theme, modifyTheme] = createResource<Theme>(getTheme);
    const [language, setLanguage] = createSignal<Lang>(Lang.EN);
    //@ts-ignore
    const [lang] = createResource<any>(language, getLangPackage);
    const [os] = createResource<Platform>(getPlatform);
    const [show, setShow] = createSignal<boolean>(false);

    const toggleTheme = (): void => {
        document.documentElement.classList.toggle("dark");
        modifyTheme.mutate(theme() === Theme.Dark ? Theme.Light : Theme.Dark);
    };

    const toggleSettings = (): void => {
        setShow(!show());
    };

    return (
        <Context.Provider value={{
            lang,
            theme,
            toggleTheme,
            setLanguage,
            language,
            toggleSettings
        }}>
            {(!os.loading && !lang.loading) && (
                <>
                    <Switch>
                        <Match when={os() === "darwin"}>
                            <DarwinTitlebar />
                        </Match>
                    </Switch>

                    <Transition name="settings-menu">
                        {show() && <Settings />}
                    </Transition>

                    {props.children}
                </>
            )}
        </Context.Provider>
    );
};

export const getPreference = () => useContext(Context) as PreferenceContext;
export default Preference;
