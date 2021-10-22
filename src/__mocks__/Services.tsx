export const getSiteWideAnonScript = async (): Promise<Response> => {
  return await new Promise((resolve, reject) => {
    resolve(new Response(new Blob(), { status: 400 }))
  })
}

export const getAvailableProjects = async (): Promise<Response> => {
  return await new Promise((resolve, reject) => {
    resolve(new Response(new Blob(), { status: 400 }))
  })
}
