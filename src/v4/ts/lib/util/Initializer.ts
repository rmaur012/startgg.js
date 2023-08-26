import 'colors'
import log from 'winston'
import Cache from './Cache'
import NI from './NetworkInterface'
import QQ from './QueryQueue'
import TokenHandler from './TokenHandler'

function handleErrors(e: Error): void{
    console.error(e.message.red)
    console.error('NOTE: Check your debug log for stack trace'.grey)
    log.debug(e)
}

export default function(token: string){
    // process.on('error', handleErrors)
    (process as NodeJS.EventEmitter).on('error', handleErrors)
    process.on('unhandledRejection', handleErrors)
    process.on('uncaughtException', handleErrors)

    TokenHandler.setToken(token)
    Cache.init()
    NI.init()
    QQ.init()
}
