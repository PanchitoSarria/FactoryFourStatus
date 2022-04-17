import { useState, useEffect } from 'react'
import useFetchApiStatus from '../libs/FetchApiStatus' // hook for fetching all the APIs with a Promise.allSettled call
import ApiNameCard from '../components/ApiNameCard'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const API_NAME = ['accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms', 'invites', 'media', 'messages', 'namespaces', 'orders', 'patients', 'relationships', 'rules', 'templates', 'users', 'workflows']
const REFRESH_TIME = 12000

export default function Home() {
  const [apiList, setApiList] = useState([])

  const asynFunc = async () => {
    const {data} = await useFetchApiStatus(API_NAME)
    setApiList([...data])
  }
  
  // first useEffect for first app mount
  useEffect(() => {
    asynFunc()
  }, [])

  // second useEffect for refreshing the status of all APIs
  useEffect(() => {
    const interval = setTimeout(() => {
      asynFunc()
    }, REFRESH_TIME);

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
