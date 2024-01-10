const { NFTStorage, File } = require('nft.storage')

const NFT_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBiYkNFQUQ4YjRCNTY0ODVFNkE0OTBEYzQzYzk4QjU5MDk1NTg2NDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNDgwNTkxOTIyNSwibmFtZSI6IklJTS10ZXN0In0.up5zRl8_YyyJjJpviZ1oGq4Sm0iuj0nRz13cSROB89Q";

async function getExampleImage() {
  const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}


async function deployMetadata() {
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

  //const imageFile = new File([ someBinaryImageData ], 'nft.png', { type: 'image/png' })
  const metadata = {
    name: 'Quizz n°1',
    description: 'A certificate that you have passed the first quizz',
    image: new File([ await getExampleImage() ], 'nft.png', { type: 'image/png' }),
    properties: {
      score: "12/20",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    }
  }


  const metadataResponse = await client.store(metadata)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadataResponse.url)
}

deployMetadata();