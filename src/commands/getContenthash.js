exports.command = 'getContenthash <ensname>'

exports.describe = 'Get the contenthash for an ENS name'

exports.builder = (yargs) => {
    return yargs
    .positional('ensname', {
        description: 'ENS Name to query or update',
        type: 'string',
    })
}

exports.handler = async ({updater}) => {
    try {
        let {codec, hash} = await updater.getContenthash()
        if (hash === undefined) {
            console.log('No contenthash record set')
        } else {
            console.log(`${codec}: ${hash}`)
        }
    } finally {
        updater.stop()
    }
}
