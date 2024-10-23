import Link from "next/link"

export default function Home() {
  return (
    <main>
      <section className="container mx-auto py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">Style your Websites</h2>
        <p className="text-xl text-gray-700 mb-8">Style your old, boring web pages into something cool using our AI CSS Style Generator.</p>
        <Link href="/css-generator">
        <button className="bg-black text-white px-8 py-3 rounded-full text-2xl font-bold hover:bg-gray-800 transition">Get Started</button>
        </Link>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-500">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">Paste the Code</h3>
              <p className="text-gray-700">Simply paste the code for which you want to see wonderful styles generated</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">Give Description</h3>
              <p className="text-gray-700">Give the description on how you want to see the style - be it color combination or anything else</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">Check the Results</h3>
              <p className="text-gray-700">If you are happy with results, you are good to go! If not, provide further prompts</p>
            </div>
              <p className="text-gray-700"></p>
              <p className="text-gray-700"></p>
              <p className="text-gray-700"></p>
          </div>
        </div>
      </section>
    </main>
  )
}