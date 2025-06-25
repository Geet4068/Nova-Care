import Wrapper from '@/Layouts/Wrapper/Wrapper'
import { Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Component {...pageProps} />
          <ToastContainer autoClose={1500} />
        </Wrapper>
      </QueryClientProvider>

    </>
  )
}
