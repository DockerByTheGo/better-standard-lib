import { TypeError } from "../error";

export class MemberAlreadyPresent<TMessage extends string> extends TypeError<"memeber already present", TMessage> {

}