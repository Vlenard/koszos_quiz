import { Component, Match, Show, Switch, createMemo, createSignal } from "solid-js";
import { ViewContainer } from "../View";
import Header from "../../headers/Header";
import { getPlayer } from "../../player/Player";
import IconButton from "../../buttons/IconButton";
import { AiOutlineSwap } from 'solid-icons/ai'
import { getPreference } from "../../preference/Preference";
import SettingsButton from "../../buttons/SettingsButton";
import BasicButton from "../../buttons/BasicButton";
import HostView from "./sub/HostView";
import JoinView from "./sub/JoinView";


const MainMenu: Component = () => {

    const player = getPlayer();
    const pref = getPreference();
    const [subView, setSubView] = createSignal<"Join" | "Host" | "Creator">("Host");

    return (
        <ViewContainer>
            <Header.Bar>
                <Header.Contents>
                    <BasicButton onClick={() => setSubView("Host")} selected={subView() === "Host"} class="py-1 px-3">
                        {pref.lang()["host"]/*Host*/}
                    </BasicButton>

                    <BasicButton onClick={() => setSubView("Join")} selected={subView() === "Join"} class="py-1 px-3">
                        {pref.lang()["join"]/*Join*/}
                    </BasicButton>

                    <BasicButton onClick={() => setSubView("Creator")} selected={subView() === "Creator"} class="py-1 px-3">
                        {pref.lang()["creator"]/*Create*/}
                    </BasicButton>
                </Header.Contents>

                <Header.Contents>
                    <IconButton onClick={player.signOut} class="px-2">
                        <span>{player.name()}</span>
                        <AiOutlineSwap size={20} />
                    </IconButton>
                    <SettingsButton />
                </Header.Contents>
            </Header.Bar>

            <Show when={player.authed()}>
                <div class="relative flex flex-1">
                    <Switch>
                        <Match when={subView() === "Host"}>
                            <HostView />
                        </Match>
                        <Match when={subView() === "Join"}>
                            <JoinView />
                        </Match>
                    </Switch>
                </div>
            </Show>
        </ViewContainer>
    );
};

export default MainMenu;