import { createSolidDataset, getSolidDataset, saveSolidDatasetAt } from '@inrupt/solid-client'
import { Session } from '@inrupt/solid-client-authn-browser'
import { findTaskEntries } from './query'
import { Todo } from './model'

// TODO: Ah, here's the stuff we need (and in query.ts) :-) But it looks like these functions are not used anywhere?

async function getOrCreateTodoList(containerUri: string, fetch: any): Promise<any> {
  const indexUrl = `${containerUri}index.ttl`
  try {
    return await getSolidDataset(indexUrl, { fetch })
  } catch (error: any) {
    if (error.statusCode === 404) {
      return await saveSolidDatasetAt(indexUrl, createSolidDataset(), { fetch })
    }
    throw error
  }
}

async function getTodoListViaQuery(session: Session): Promise<Todo[]> {
  return await findTaskEntries(session)
}

export { getOrCreateTodoList, getTodoListViaQuery }
