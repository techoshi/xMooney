import { Button, Container, Text, Flex, Box, TabList, Tabs, Tab, TabPanel, TabPanels, IdProvider, Link, keyframes, useFocusEffect } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis"
import Balance from "../components/Balance";
import Header from "../components/Header";
import bannerimg from "../assets/logos/xMooney_Logo_Token_300px_x_300px.png"

import { useState, useEffect } from "react";
import NFT from "../components/NFT";
import Profile from "../components/Profile";
import Send from "../components/Send";
import Transactions from "../components/Transactions";
import XMooneyTransactions from "../components/XMooneyTransactions";
// import Land from "../components/Land";
// import Land from "../components/Three"
import Land from "../components/ThreeNew"
import XMVR from "../components/XMVR"
import Game from "../components/Game";
import WithSubnavigation from "../components/NewHeader"; 


export default function Home() {

  const { isAuthenticated, authenticate, user, logout, isLoggingOut, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis();

  const animationKeyframes = keyframes`
    0% { transform: scale(1) rotate(0); border-radius: 20%; }
    25% { transform: scale(2) rotate(0); border-radius: 20%; }
    50% { transform: scale(2) rotate(360deg); border-radius: 50%; }
    75% { transform: scale(1) rotate(360deg); border-radius: 50%; }
    100% { transform: scale(1) rotate(0); border-radius: 20%; }
  `;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;


  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-br, white.400, blackAlpha.300)"
        >
          <Box
            as={motion.div}
            animation={animation}
            // not work: transition={{ ... }}
            padding="2"
            // bgGradient="linear(to-l, #ffffff, #ffffff)"
            width="20"
            height="20"
            display="flex"
          >
            <Image src={bannerimg} alt="Eminent Logo" />
          </Box>
          <br></br>
          {/* <Text fontSize="5xl" fontWeight="bold" color="black">{process.env.title}</Text> */}
          <Text fontSize="2sm" fontWeight="bold" color="black">Please connect to BSC Testnet</Text>
          <Link href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank">How to Add BSC Testnet to Metamask?</Link>

          {process.env.enableWalletConnect &&
            <>
              <Button colorScheme="blackAlpha" size="lg" mt="6" onClick={() => authenticate(
                {
                  chain: process.env.NEXT_PUBLIC_CHAIN,
                  signingMessage: "Sign to login to xMooney",
                  provider: "walletconnect"
                }
              )} >Login with Walletconnect</Button>
            </>
          }
          <Button colorScheme="blackAlpha" size="lg" mt="6" onClick={() => authenticate(
            { chain: process.env.NEXT_PUBLIC_CHAIN, signingMessage: "Sign to login to xMooney" }
          )} >Login with Metamask</Button>
        </Flex>
      </>
    )
  }


  return (
    <>
      <Head>
        <title>{process.env.title}</title>
      </Head>
      <Flex direction="column">        
        <WithSubnavigation user={user} logout={logout} isLoggingOut={isLoggingOut}></WithSubnavigation>
        <Land user={user} ></Land>
      </Flex>
    </>
  )
}
