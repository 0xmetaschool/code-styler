import './globals.css' 
import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  )
}
