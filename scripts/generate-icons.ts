import fs from 'node:fs'
import { exec } from 'node:child_process'

const spriteFilePath = './public/sprites.svg'
const iconsFolderPath = './public/icons'
const typeFileIconPath = './src/components/Icon/IconTypes.ts'

async function addIconsInSprite() {
  let iconsContent: {
    name: string
    content: string
  }[] = []

  if (fs.existsSync(iconsFolderPath)) {
    const files = fs.readdirSync(iconsFolderPath)
    for (const file of files) {
      console.log(file)
      if (!fs.lstatSync(`${iconsFolderPath}/${file}`).isFile()) return
      const [name] = file.split('.')
      const filePath = `${iconsFolderPath}/${file}`
      const iconContent = fs.readFileSync(filePath, {
        encoding: 'utf-8'
      })

      const content = iconContent
        .replace('<svg', `<symbol id="${name}"`)
        .replace('</svg>', '</symbol>')

      iconsContent.push({
        name,
        content
      })
    }
  }

  iconsContent = iconsContent.sort((a, b) => a.name.localeCompare(b.name))

  const typeAvailableIcons = iconsContent
    .map(({ name }) => `'${name}'`)
    .join('|')

  const iconsTypeFile = `
      export type AvailableIcons = ${typeAvailableIcons}
  `

  fs.writeFileSync(typeFileIconPath, iconsTypeFile, {
    flag: 'w'
  })

  console.log(`File ${typeFileIconPath} updated`)

  const spritesFile = `<svg style="display:none">\n${iconsContent
    .map(({ content }) => `    ${content}`)
    .join('\n')}\n</svg>`

  fs.writeFileSync(spriteFilePath, spritesFile)

  exec(`next lint --fix --file ${typeFileIconPath} --file ${spriteFilePath}`)

  console.log(`File ${spriteFilePath} updated`)
}

addIconsInSprite().catch(console.error)
