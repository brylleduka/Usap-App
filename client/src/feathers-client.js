import feathers from '@feathersjs/feathers'

import primusClient from '@feathersjs/primus-client'
import auth from '@feathersjs/authentication-client'

import Primus from 'primus-client'
import { iff, discard } from 'feathers-hooks-common'
import feathersVuex from 'feathers-vuex'

// const socket = new Primus('https://salitaan.herokuapp.com', { transports: ['websocket'] })
const socket = new Primus('http://localhost:3035', { transports: ['websocket'] })

const feathersClient = feathers()
    .configure(primusClient(socket))
    .configure(auth({ storage: window.localStorage }))
    .hooks({
        before: {
            all: [
                iff(
                    context => ['create', 'update', 'patch'].includes(context.method),
                    discard('__id', '__isTemp')
                )
            ]
        }
    })

export default feathersClient

// Setting up feathers-vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } = feathersVuex(
    feathersClient,
    {
        serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
        idField: '_id', // Must match the id field in your database table/collection
        whitelist: ['$regex', '$options']
    }
)

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex }