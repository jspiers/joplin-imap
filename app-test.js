import { config, noteApi, folderApi, tagApi, joplinApi } from 'joplin-api'
import { clearDatabase } from './clearDatabase.js'
import { strict as assert } from 'assert';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function listall() {
    // get folders
    const folders = await folderApi.list()
    console.log("Folders:", folders)
    assert.equal(folders.items.length, 0)

    // get notes
    const notes = await noteApi.list()
    console.log("Notes:", notes)
    assert.equal(notes.items.length, 0)

    // get tags
    const tags = await tagApi.list()
    console.log("Tags:", tags)
    assert.equal(tags.items.length, 0)
}

async function deleteFolder(folder) {
    console.log("Deleting %s", folder.id)
    await folderApi.remove(folder.id)
    return null
}

async function test_multiple(n, ms) {

    var folders = []

    for (let i = 0; i < n; i++) {
        folders.push(await folderApi.create({
            title: 'myfolder' + Math.random(),
            // parent_id: '',
        }))
        console.log("folder:", folders[folders.length - 1])
        await sleep(ms)
    }

    while (folders.length > 0) {
        let folder = folders.pop()
        deleteFolder(folder)
        await sleep(ms)
    }

    // folders.foreach(async (folder) => {
    //     deleteFolder(folder)
    //     await sleep(ms)
    // })
}

async function test_nested(ms) {
    // create parent folder
    const parent = await folderApi.create({
        // title: 'parent' + Math.random(),
        title: 'parent',
        // parent_id: '',
    })
    console.log("parent:", parent)

    // create child folder
    const child = await folderApi.create({
        // title: 'child' + Math.random(),
        title: 'child',
        parent_id: parent.id,
    })
    console.log("child:", child)

    await sleep(ms)
    await deleteFolder(child)
    await sleep(ms)
    await deleteFolder(parent)
    await sleep(ms)
}

// configure joplin-api
config.baseUrl = process.env.JOPLIN_URL
config.token = process.env.JOPLIN_TOKEN

// liveness test
var res = false
while (!res) {
    res = await joplinApi.ping()
    console.log("ping", res)
    await sleep(3000)
}

// clear any existing folders, notes, tags
await clearDatabase()
await listall()
for (let i = 0; i < 2; i++) {
    await test_multiple(2, 1000)
}

// await [child, parent].forEach(async (element) => {
//     console.log("Deleting %s", element.id)
//     await folderApi.remove(element.id)
// });
