const apiFetch = async (apiName) => {
    try {
      const data = await fetch(`https://api.factoryfour.com/${apiName}/health/status`)
      const res = await data.json()
      return {...res, 'name': apiName}
      
    } catch (error) {
      return {
        "success": false,
        "message": "Error",
        "hostname": "OUTAGE",
        "time": '403 Forbidden',
        'name': apiName
      }
    }
}

const FetchApiStatus = async (itemsArray) => {
  const data = []
  const res = await Promise.allSettled(itemsArray.map(name => {
    return apiFetch(name)
    })).
  then((results) => {
    results.forEach((result, index) => {
      data.push(result.value)
    })
  })
  return {data}
}

export default FetchApiStatus