import { TypeError } from "../error";

export class MemberAlreadyPresent<TMessage extends string> extends TypeError<"member already present", TMessage> {

}
