import type { AgentMessage } from '../../../agent/AgentMessage'

import { AriesFrameworkError } from '../../../error'
import { JsonTransformer } from '../../../utils/JsonTransformer'
import { DidCommMessageVersion } from '../../types'

import { DidCommV2BaseMessage } from './DidCommV2BaseMessage'

export class DidCommV2Message extends DidCommV2BaseMessage implements AgentMessage {
  public toJSON(): Record<string, unknown> {
    return JsonTransformer.toJSON(this)
  }

  public get didCommVersion(): DidCommMessageVersion {
    return DidCommMessageVersion.V2
  }

  public get threadId(): string | undefined {
    return this.thid
  }

  public hasAnyReturnRoute() {
    return false
  }

  public hasReturnRouting() {
    return false
  }

  public setReturnRouting(): void {
    throw new AriesFrameworkError('DidComm V2 message does not provide `setReturnRouting` method')
  }

  public is<C extends typeof DidCommV2Message>(Class: C): this is InstanceType<C> {
    return this.type === Class.type.messageTypeUri
  }

  public setRecipient(to?: string) {
    this.to = to ? [to] : undefined
  }

  public get firstRecipient(): string | undefined {
    return this.to?.length ? this.to[0] : undefined
  }
}
