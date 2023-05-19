import { GameData } from "../game/types/GameData";
import Error from "../game/errors/Error";

type UpdateEvent = (data: GameData, err: Error<any>) => void;

export default UpdateEvent;