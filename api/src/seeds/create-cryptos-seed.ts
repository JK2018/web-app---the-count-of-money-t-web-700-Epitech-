import { Crypto } from './../crypto/entities/crypto.entity';
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Crypto)
      .values([
        {
          cmid: "bitcoin",
          fullName: "Bitcoin",
          imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/BTC_Logo.svg/2000px-BTC_Logo.svg.png",
          default: true
        },
        {
          cmid: "ethereum",
          fullName: "Ethereum",
          imgUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png",
          default: true
        },
        {
          cmid: "ripple",
          fullName: "XRP",
          imgUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
          default: true
        },
        {
          cmid: "tether",
          fullName: "Tether",
          imgUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
          default: true
        },
        {
          cmid: "litecoin",
          fullName: "Litecoin",
          imgUrl: "https://cdn.worldvectorlogo.com/logos/litecoin.svg",
          default: true
        },
        {
          cmid: "bitcoin-cash",
          fullName: "Bitcoin Cash",
          imgUrl: "https://wallet.cryptospend.com.au/images/bitcoin-cash-bch.png",
          default: true
        },
        {
          cmid: "chainlink",
          fullName: "Chainlink",
          imgUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png",
          default: true
        },
        {
          cmid: "cardano",
          fullName: "Cardano",
          imgUrl: "https://s3.cointelegraph.com/storage/uploads/view/a7872fcc56858227ffa183256a5d55e1.png",
          default: true
        },
        {
          cmid: "polkadot",
          fullName: "Polkadot",
          imgUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
          default: true
        },
        {
          cmid: "binancecoin",
          fullName: "Binance Coin",
          imgUrl: "https://www.bitprime.co.nz/wp-content/uploads/2018/08/binance-coin-logo-png-transparent-1024x1024.png",
          default: true
        },
        {
          cmid: "stellar",
          fullName: "Stellar",
          imgUrl: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
          default: false
        },
        {
          cmid: "usd-coin",
          fullName: "USD Coin",
          imgUrl: "https://bitcoinmatin.fr/wp-content/uploads/2019/10/usdc-logo.png",
          default: false
        },
      ])
      .execute()
  }
}