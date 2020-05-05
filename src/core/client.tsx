import "mobx-react-lite/batchingForReactDom"
import React from "react"
import { hydrate, render } from "react-dom"
import { StoreManager } from "../state/classes/StoreManager"
import { ManagerProvider } from "../state/contexts/ManagerContext"
import { stores } from "../state/stores"
import { App } from "./components/App"
import { ErrorBoundary } from "./components/ErrorBoundary"

const initialize = async () => {
  const manager = new StoreManager(stores)
  await manager.initialize()

  if (DEV) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const global = window as any
    global.manager = manager
  }

  const app = (
    <ErrorBoundary>
      <ManagerProvider value={manager}>
        <App />
      </ManagerProvider>
    </ErrorBoundary>
  )

  const container = document.querySelector("#app")
  if (container?.hasChildNodes()) {
    hydrate(app, container)
  } else {
    render(app, container)
  }
}

initialize().catch(error => {
  console.error("Error initialising app:", error)
})
