import { GameData } from "./GameData";
import Error from "../errors/Error";

type UpdateEvent = (update: {data?: GameData, err?: Error<any>}, id?: string) => void;

export default UpdateEvent;