


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'SlashComma... Remove this comment to see the full error message
const { SlashCommandBuilder, ComponentType } = require("discord.js")



// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Button'.
const { Button } = require("../Yi_component.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube-instruments")
    .setDescription("play instruments in Youtube")
    .addStringOption((option) =>
      option
        .setName("樂器大師ヽowoノ")
        .setDescription("選擇樂器")
        .setRequired(true)
        .addChoices(
          { name: "Trumpet", value: "trumpet" },
          { name: "Violin", value: "violin" },
          { name: "Kazoo", value: "kazoo" },
          { name: "Calculator", value: "calculator" },
          { name: "Dial_Pad", value: "dial_pad" },
          { name: "Baritone_Saxophone", value: "baritone_saxophone" },
          { name: "Ocarina", value: "ocarina" },
          { name: "Piano", value: "piano" },
          { name: "Guitar", value: "guitar" },
          { name: "Kalimba", value: "kalimba" },
          { name: "Bamboo_Flute", value: "bamboo_flute" },
          { name: "Electric_Guitar", value: "electric_guitar" },
          { name: "Flute", value: "flute" },
          { name: "Band", value: "band" },
          { name: "Beatboxer", value: "beatboxer" }
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getString("樂器大師ヽowoノ")
    switch (subcommand) {
      case "trumpet":
        await reply(interaction, "https://www.youtube.com/watch?v=xa17zHJhNhA")
        break
      case "violin":
        await reply(interaction, "https://www.youtube.com/watch?v=-uf_VyaPDqI")
        break
      case "kazoo":
        await reply(interaction, "https://www.youtube.com/watch?v=Kr8vUtj1DCU")
        break
      case "calculator":
        await reply(
          interaction,
          "https://www.youtube.com/watch?v=2jM09TpRchQ&t=60s"
        )
        break
      case "dial_pad":
        await reply(
          interaction,
          "https://www.youtube.com/watch?v=XVtpk8Ckn0g&t=45s"
        )
        break
      case "baritone_saxophone":
        await reply(interaction, "https://www.youtube.com/watch?v=L2OBh7pJD7I")
        break
      case "ocarina":
        await reply(interaction, "https://www.youtube.com/watch?v=4hVkwJT5bVE")
        break
      case "piano":
        await reply(
          interaction,
          "https://www.youtube.com/watch?v=BcL2AhaHJAg&t=11s"
        )
        break
      case "guitar":
        await reply(interaction, "https://www.youtube.com/watch?v=Y4zphR-fPDw")
        break
      case "kalimba":
        await reply(interaction, "https://www.youtube.com/watch?v=lzM1jf9cPRM")
        break
      case "bamboo_flute":
        await reply(interaction, "https://www.youtube.com/watch?v=vQXIHxp2RQQ")
        break
      case "electric_guitar":
        await reply(
          interaction,
          "https://www.youtube.com/watch?v=aSsHVHaPn4g&t=28s"
        )
        break
      case "flute":
        await reply(interaction, "https://www.youtube.com/watch?v=oIZiyOpWIvE")
        break
      case "band":
        await reply(interaction, "https://www.youtube.com/watch?v=V3fiIjwASkA")
        break
      case "beatboxer":
        await reply(interaction, "https://www.youtube.com/watch?v=yyvtXFco_Yw")
        break
      default:
        await interaction.reply({ content: "請選擇樂器", ephemeral: true })
        break
    }
    async function reply(interaction, link) {
      const response = await interaction.reply({
        content: `${link}`,
        components: [Button],
        ephemeral: false
      })
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 3_600_000
      })

      collector.on("collect", async (i) => {
        await i.reply({
          content: `${atob(
            "57Ch6K2cCk5hdGlvbmFsIEFudGhlbSBvZiBVU1NSIChCZXN0IGlmIHBsYXllZCBhdCAwLjUgc3BlZWQpCjggICAgICA1IDggICAgNSA2IDcgICAzIDMgNiAgIDUgNCA1ICAgMSAxICAgMiAgICAyIDMgNCAgICA0IDUgNiAgICA3IDggOSAgICA1IDUgMCAgICA5IDggOSAgICA1IDUgOCAgICA3IDYgNyAgICAzIDMgNiAgICA1IDQgNSAgICAxIDEgOCAgICA3IDYgNSAwICAgOSAgIDggNyA4IDkgICA1IDUgICA4ICAgNyA2IDUgNiA3ICAgIDMgMyAgICA4ICAgNiA3IDggICAgNiA3IDggICA2IDggNCAgICA0ICAgMCA5IDggOSAwICAgOCA4ICAgOSAgIDggNyA2IDcgOCAgIDYgNiAgICA4ICAgNyAgIDYgNSAgIDEgICAxIDUgICAgIDYgICA3ICAgOAoKNjQKCk5ldmVyIEdvbm5hIEdpdmUgWW91IFVwIC0tIFJpY2sgQXN0bGV5CjItMy00LTItNi02LTUgKE5ldmVyIGdvbm5hIGdpdmUgeW91IHVwKQoxLTItMy0xLTUtNS00LTMtMiAobmV2ZXIgZ29ubmEgbGV0IHlvdSBkb3duKQoyLTItNC0yLTQtNS0zLTItMS0xLTUtNCAobmV2ZXIgZ29ubmEgcnVuIGFyb3VuZCBhbmQgZGVzZXJ0IHlvdSkKMi0zLTQtMi02LTYtNSAobmV2ZXIgZ29ubmEgbWFrZSB5b3UgY3J5KQoxLTItMy0xLTgtMy00LTMtMiAobmV2ZXIgZ29ubmEgc2F5IGdvb2RieWUpCjItMy00LTItNC01LTMtMi0xLTEtNS00IChuZXZlciBnb25uYSB0ZWxsIGEgbGllIGFuZCBodXJ0IHlvdSkKCk1jZG9uYWxkcyB0aGVtZSAgICAgICAgICAgICAKICAxMjMgNjUgIAoKQXN0cm9ub21pYS9Db2ZmaW4gRGFuY2UgTWVtZSBzb25nOgoyIDIgNiA1IDQgMyAgMyA0IDUgIDQgMyAyICAyIDQgMyA0IDMgNCAgIDIgIDIgNCAzIDQgMyA0ICAKCkJhYnkgU2hhcms6CiA1Njg4OCA4OCA4OCA1Njg4OCA4OCA4OCA1Njg4OCA4OCA4OCA4ODcKClNhZCB0aGVtZSB1cCAKNC02LTQtMywgICAgICA0LTYtMy0yLCAgIDItNC0yLTEsICAgICAgMi02LTUsICAgMi02LTUsICAgNC0yLCA0LTUtNC0zLCAzLTUtMy0xLCA4LTAtOC03K0oKCkZvcmNlIFRoZW1lLCBTdGFyIFdhcnMKMzYgNyA4LTktOCAzIDMtNiA3IDggMyA4IDYgMCA5IAoKU3RhciB3YXJzIHRoZW1lCjEgIDUgIDQtMy0yICA4ICA1ICA0LTMtMiAgOCAgNSAgNC0zLTQtMgoKRGVzcGFjaXRvCjggICA3ICAgNjMgIDMzMzMgIDY2NjYgIDY1NjQgIDQ0NDQgNjY2NjcgOCA1IDU1NTUgODg4IDk5IDcgIDggNyA2IDMKCkF0dGFjayBvbiBUaXRhbiBPUCAxCjIyNDMgMTEgMjI0MzEgNjQgNTMgNDIgMzEgNjQgNTMgNDIgMzEKClRva3lvIEdob3VsIE9QIDEgCjg5ODc2IDk4NzYgNjUgNTQ1MyAzMzMzMDAgODc3Nzg4IDg5ODc2IDk4NzYgNjUgNTQ1MyAzMzMzMDAgODc3Nzg4IAo2NjYtNjY2NiAwOTgwOTggNjY2LTY2NjYgLS0tIDM4NjYgMzIzIDM4NjYgMzIzIDM4NjYgMzIzIDM4NjYgMzIzCjg2OTg2IDc4ODggODAwOTkgODc4NzUzCjU1MyA1NTMzIDIyMzMgNTUzMyAyMjMzIDU1MyAzMjIzMzQzCjMwOSAwOTk5OCA4Nzg3NSA1MDkgOTk4IDg3ODU3IDg2NTMxIDg4NzY3OAo4Nzg3NSAwMDk5IDk5ODggODc4NzUgNTA5IDk5OCA4Nzg1NyA2NjUzMSA4ODc2NzgKCkdhbWUgb2YgVGhyb25lcwo2MiA0NTYgMiA0NTMKIDUxIDQzNSAxIDQzMgoKNjIgNDU2IDIgNDUzCiA1MSA0MzUgMSA0MzIKMzcKCkJ1bm55IGdpcmwgc2VucGFpIGVuZGluZwoKMiA2IDUgNiAyIDYgNSA2IDIgNiA1IDMgNCAyIDYgNSA2IDIgNiA1IDEgNyA2IDIgNiA1IDYgMSA2IDUgMyA0IDYgMiA2IDUgNiAyIDYgNSA0IDEgMyAzIDQgNCA1IDUgMyAzIDYgNiA3IDcgNyAxIDUgMyA2IDUgNSA0IDYgMSA1IDYgMiA2IDUgNiAyIDYgNSA2IDIgNiA1IDMgNCAyIDYgNSA2IDIgNiA1IDEgNyA2IDIgNiA1IDYgMSA2IDUgMyA0IDYgMiA2IDUgNiAyIDYgNSA0IDEgMw=="
          )}}`,
          ephemeral: false
        })
      })
    }
  }
}
