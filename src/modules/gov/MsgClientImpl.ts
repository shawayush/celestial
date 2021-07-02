import { MsgDeposit, MsgSubmitProposal, MsgVote } from '../../codec/cosmos/gov/v1beta1/tx';
import { BroadcastTxResponse } from '../../types/broadcastTxResponse';
import { Context } from '../../types/Context';
import { TsProtoGeneratedType } from '../../types/TsProtoGeneratedType';

enum GovMsg {
    SubmitProposal = 'SubmitProposal',
    Vote = 'Vote',
    Deposit = 'Deposit',
}

interface MsgClient {
    [GovMsg.SubmitProposal](request: MsgSubmitProposal, password: string): Promise<BroadcastTxResponse> | undefined;
    [GovMsg.Vote](request: MsgVote, password: string): Promise<BroadcastTxResponse> | undefined;
    [GovMsg.Deposit](request: MsgDeposit, password: string): Promise<BroadcastTxResponse> | undefined;
}

export class MsgClientImpl implements MsgClient {
    private package = '/cosmos.gov.v1beta1';
    protected registryTypes: ReadonlyArray<[string, TsProtoGeneratedType]> = [
        [`${this.package}.Msg${GovMsg.SubmitProposal}`, MsgSubmitProposal],
        [`${this.package}.Msg${GovMsg.Vote}`, MsgVote],
        [`${this.package}.Msg${GovMsg.Deposit}`, MsgDeposit],
    ];
    private ctx: Context;

    constructor(ctx: Context) {
        this.ctx = ctx;
    }

    // TODO fix fees
    [GovMsg.SubmitProposal](request: MsgSubmitProposal, password: string) {
        return this.ctx.modules?.tx?.signAndBroadcast(
            [
                {
                    typeUrl: `${this.package}.Msg${GovMsg.SubmitProposal}`,
                    value: request,
                },
            ],
            this.ctx.fees.delegate,
            password,
        );
    }

    [GovMsg.Vote](request: MsgVote, password: string) {
        return this.ctx.modules?.tx?.signAndBroadcast(
            [
                {
                    typeUrl: `${this.package}.Msg${GovMsg.SubmitProposal}`,
                    value: request,
                },
            ],
            this.ctx.fees.delegate,
            password,
        );
    }

    [GovMsg.Deposit](request: MsgDeposit, password: string) {
        return this.ctx.modules?.tx?.signAndBroadcast(
            [
                {
                    typeUrl: `${this.package}.Msg${GovMsg.Deposit}`,
                    value: request,
                },
            ],
            this.ctx.fees.delegate,
            password,
        );
    }
}
