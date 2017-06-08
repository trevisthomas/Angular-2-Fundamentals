import { OpaqueToken } from '@angular/core'

export let TOASTR_TOKEN = new OpaqueToken('toastr')

/**
 * Note!  This interface only exists to get intelisence.  It is not required to create
 * an interface when using Opaque Tokens to turn 3rd party libraries into injectable services
 */
export interface Toastr {
    success(msg: string, title?: string): void;
    info(msg: string, title?: string): void;
    warning(msg: string, title?: string): void;
    error(msg: string, title?: string): void;
}
