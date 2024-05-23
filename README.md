# Extension Metamask Provider

A way to connect your Chrome Extension to Metamask.

It works exactly like [Metamask Extension Provider](https://github.com/MetaMask/extension-provider), but it doesn't have a deprecated dependency.

## Installation

```
# npm (use any of npx, yarn dlx, pnpm dlx, or bunx)
npx jsr add @whiteand/extension-metamask-provider

# deno
deno add @whiteand/extension-metamask-provider
```

## Example

```typescript
import createMetamaskProvider from '@whiteand/extension-metamask-provider'

const provider = createMetamaskProvider()

provider.request({
    // ...
}).then((result) => {
    // ...
})
```