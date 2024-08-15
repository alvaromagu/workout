import {writeFile} from 'node:fs/promises'

const args = process.argv.slice(2)

const baseUrl = 'https://wger.de/api/v2'

function toObj (res) {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  console.log(`Status: ${res.status} - Text: ${res.statusText}`)
  return res.json()
}

async function exerciseInfo () {
  const arr = []
  const firstRes = await fetch(`${baseUrl}/exercisebaseinfo/?limit=${20}&offset=${0}`).then(toObj).catch(console.error)
  arr.push(firstRes.results)
  let next = firstRes.next
  while (next != null) {
    const res = await fetch(next).then(toObj).catch(console.error)
    arr.push(res.results)
    next = res.next
  }
  await writeFile('./scripts/exercise-info.json', JSON.stringify(arr.flat().sort((a, b) => b.id - a.id), null, 2))
}

args.includes('--info') && await exerciseInfo();
