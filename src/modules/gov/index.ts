import { QueryClientImpl } from '../../codec/cosmos/gov/v1beta1/query';
import { Context } from '../../types/Context';
import { MsgClientImpl } from './MsgClientImpl';

export default class GovModule extends MsgClientImpl {
    queries: QueryClientImpl;

    constructor(ctx: Context) {
        super(ctx);
        this.registryTypes.forEach((t) => ctx.registry.register(t[0], t[1]));
        this.queries = new QueryClientImpl(ctx.rpc);
    }
}
