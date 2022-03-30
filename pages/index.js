import { useState, useEffect } from 'react'
import ApiNameCard from '../components/ApiNameCard'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const apiNames = ['accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients', 'relationships', 'rules', 'templates', 'users', 'workflows']
const refreshTime = 15000

export default function Home() {
  const [apiList, setApiList] = useState([])

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

  useEffect(() => {
    const data = []
    Promise.allSettled(apiNames.map(name => {
        return apiFetch(name)
      })).
    then((results) => {
      results.forEach((result, index) => {
        data.push(result.value)
      })
      setApiList([...data])
    })
  }, [])

  useEffect(() => {
    const interval = setTimeout(() => {
      const data = []
      Promise.allSettled(apiNames.map(name => {
          return apiFetch(name)
        })).
      then((results) => {
        results.forEach((result, index) => {
          data.push(result.value)
        })
        setApiList([...data])
    })
    }, refreshTime);

    return () => clearTimeout(interval)
  }, [apiList])

  return (
    <div>
      <Head>
        <title>FactoryFor APIs status</title>
        <meta name="description" content="APIs status query page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          FactoryFor Status Dashboard
        </h1>

        <section className={styles.cardsGrid}>
          {
            apiList.map((api, i) => {
              return (
                <ApiNameCard key={i} {...api}/>
              )
            })
          }
        </section>  
      </main>
    </div>
  )
}
