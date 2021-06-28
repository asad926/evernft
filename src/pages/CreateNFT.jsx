import React from "react";
import { Link } from "react-router-dom";
import config from "../config";
import logo from "../res/images/app_logo.png";
import fileSlectionIcon from "../res/images/file_selection_icon.png";
import getWallet from "../nfts/connectWallet"
import  EverNft from "../contracts/EverNfts.json"
import axios from 'axios';
const { create } = require('ipfs-http-client')
const ipfs = create({ 
host: "ipfs.infura.io",
port: "5001",
protocol: "https",})
var FormData = require('@postman/form-data');

const { ethereum } = window;
let web3;
let nft;
let uploadFile = null;


export default function BuyNFT() {
  const [connectBtn, setConnectBtn] = React.useState("Connect"); 
  const [selectedFile, setSelectedFile] = React.useState()

window.onload = () => {
  if(isMetaMaskInstalled)
  connectToMetaMask();
  else console.log("Please install metamask!!");
}

window.ethereum.on('accountsChanged', async function (accounts) {
  connectToMetaMask()
})

const isMetaMaskInstalled = () => {
  return Boolean(ethereum && ethereum.isMetaMask);
}

const connectToMetaMask = async () => {
  if(isMetaMaskInstalled)
  try {
    //Will Start the MetaMask Extension
    web3 = await getWallet();
    console.log("Web3 :"+web3);
    setConnectBtn("Create")
    
    nft = new web3.eth.Contract(
      EverNft.abi, EverNft.contractAddress);

  } catch (error) {
    console.error(error);
  }else console.log("Please install metamask!!");
}

const nftContract = async (nftsURI,price) => {
      let account = await web3.eth.getAccounts();
      const nftName = await nft.methods.mint(nftsURI,account[0],price).send({from:account[0]});
      console.log("nftID: " + JSON.stringify(nftName.events.Minted.returnValues.nftID));
}


async function addedToIpfs() {
  const added = await ipfs.add(uploadFile, {
    progress: (prog) => console.log(`received: ${prog}`),
  });
  let v1CID = added.cid.toV1()
  return v1CID.toBaseEncodedString('base32');
}

async function upload(){

  let formD = document.forms["formElement"];
  let data = new FormData(formD);
  let price = formD.elements["nftPrice"].value;
  console.warn(uploadFile);
  let v1CID = await addedToIpfs();

  data.append("ipfsHash",v1CID);
  let link = "http://localhost:9000/upload";
try{
  axios({
    method: "POST",
    url: link,
    data: data,
    headers: {
        "Content-Type": "multipart/form-data"
    }
    ,
    timeout: 3000,
})
    .then(response => {
            if (response.status === 200) {
                console.log("Success, firm added")
                console.log(JSON.stringify(response.data.nftsURI))
                let nftsURI = response.data.nftsURI;
                nftContract(nftsURI,  price);
                console.log("NFTS URI: "+nftsURI)
            } else {
                console.log("Error occurred")
            }
        }
    ).catch(e => {
    console.log(e)
})

}catch(e){
  console.log(e)
}
}
  const handleInput = async (e) => {
    e.preventDefault()
    const inputFile = e?.target?.files[0];
    uploadFile = inputFile;
    console.log(uploadFile);
    if (inputFile) {
      const base64 = await toBase64(inputFile)
      setSelectedFile(base64)
    }

    // document.getElementById('inputfile').click()
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <div id="__next">
      <div className="layout-container">
        <div />
        <div>
          <div />
          <div className="top-menu-bar">
            <div className="ant-row" style={{ rowGap: 0 }}>
              <div className="ant-col ant-col-2">
                <Link to={config.routes.root}>
                  <div className="branding-icon">
                    <img src={logo} alt="Project Icon" width={38} height={38} />
                  </div>
                </Link>
              </div>
              <div className="ant-col ant-col-12 ant-col-xs-0 ant-col-sm-0 ant-col-md-12 ant-col-lg-12 ant-col-xl-12 ant-col-xxl-12">
                <div>
                  <span className="ant-input-group-wrapper ant-input-group-wrapper-lg ant-input-search ant-input-search-large search-menu-large-screens">
                    <span className="ant-input-wrapper ant-input-group">
                      <span className="ant-input-affix-wrapper ant-input-affix-wrapper-lg">
                        <input
                          type="search"
                          placeholder="Search by art name, creator or collection"
                          className="ant-input ant-input-lg"
                        />
                        {/* <span className="ant-input-suffix">
                          <span
                            role="button"
                            aria-label="close-circle"
                            tabIndex={-1}
                            className="anticon anticon-close-circle ant-input-clear-icon-hidden ant-input-clear-icon"
                          >
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="close-circle"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                            </svg>
                          </span>
                        </span> */}
                      </span>
                      <span className="ant-input-group-addon">
                        <button
                          type="button"
                          className="ant-btn ant-btn-lg ant-btn-icon-only ant-input-search-button"
                        >
                          <span
                            role="img"
                            aria-label="search"
                            className="anticon anticon-search"
                          >
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="search"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                            </svg>
                          </span>
                        </button>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div className="ant-col ant-col-4" />
              <div className="ant-col ant-col-12 ant-col-xs-12 ant-col-sm-12 ant-col-md-0 ant-col-lg-0 ant-col-xl-0 ant-col-xxl-0" />
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
                className="ant-col ant-col-6"
              >
                <div className="ant-space ant-space-horizontal ant-space-align-center">
                  <div className="ant-space-item" style={{ marginRight: 25 }}>
                    <div
                      className="nfts-menu-item"
                      role="presentation"
                      tabIndex={-22}
                    >
                      <div className="nfts-menu-text">NFTs</div>
                    </div>
                  </div>
                  <div className="ant-space-item" style={{ marginRight: 25 }}>
                    <div className="create-menu-item">
                      <div onClick={connectToMetaMask} className="create-menu-item-text">{connectBtn}</div>
                    </div>
                  </div>
                  {/* <div className="ant-space-item" style={{ marginRight: 25 }}>
                    <div className="search-menu-item-small-screens">
                      <div className="ant-col search-icon-col ant-col-xs-1 ant-col-sm-1 ant-col-md-0 ant-col-lg-0 ant-col-xl-0 ant-col-xxl-0">
                        <img
                          src="/static/resources/search_icon.svg"
                          alt="Search Icon"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="ant-space-item">
                    <div
                      role="button"
                      tabIndex={-12}
                      className="connect-menu-item-div"
                    >
                      <div className="connect-menu-avatar-bg">
                        <canvas
                          className="identicon"
                          width={40}
                          height={40}
                          style={{ width: 40, height: 40 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="small-devices-search-div">
            <div />
          </div>
        </div>
        <div className="create-page-content">
          <div>
            <div>
              <div className="nft-create-card">
                <form className="ant-form ant-form-horizontal" id="formElement" encType="multipart/form-data">


                <div className="nft-img-upload-cover">
                    {selectedFile && <img src={selectedFile} alt="me" className="nft-img-uploaded" />}
                    <div />
                    <div
                      className="ant-col"
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        position: "absolute",
                        zIndex: 10,
                      }}
                    >
                      <div className="ant-spin-nested-loading">
                        <div className="ant-spin-container">
                          <div
                            className="upload-notice"
                            style={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: 10,
                            }}
                          >
                            {!selectedFile && <div style={{ flex: "0 0 200px" }}>
                              PNG, GIF, JPG, MP4 (max 8Mb)
                            </div>}
                          </div>
                          <span className="upload-comp-div"
                          // onClick={handleInput}

                          >
                            <div className="ant-upload ant-upload-select ant-upload-select-picture" >
                              <span
                                tabIndex={0}
                                className="ant-upload"
                                role="button"

                              >

                                <div
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div className={"create-nft-choose-file"} style={selectedFile && { backgroundColor: '#000', opacity: 0.24 }}>
                                    <input
                                      id="inputfile"
                                      name="nft_file"
                                      type="file"
                                      accept="image/png,image/jpeg,image/gif,image/webp,image/avif,video/mp4,video/x-m4v,video/quicktime,video/*"
                                      style={{
                                        opacity: 0,
                                        width: '100%',
                                        left: 0,
                                        position: 'absolute',
                                      }}
                                      onChange={handleInput}
                                    />
                                    <div
                                      className="ant-row"
                                      style={{ display: "flex", rowGap: 0 }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: '"IBM Plex Sans"',
                                          color: "rgb(255, 255, 255)",
                                          fontWeight: "bold",
                                          marginRight: 4,
                                        }}
                                      >
                                        {selectedFile ? "Change" : "Choose File"}
                                      </div>
                                      <div>
                                        <img
                                          src={fileSlectionIcon}
                                          alt="file selection"
                                          style={{ width: 16, height: 14 }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>

                            <div className="ant-upload-list ant-upload-list-picture" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="nft-create-card-bottom">
                    <div className="ant-col">
                      <div />
                      <div>
                        <div
                          className="ant-row ant-form-item form-item"
                          style={{ rowGap: 0 }}
                        >
                          <div className="ant-col ant-form-item-control">
                            <div className="ant-form-item-control-input">
                              <div className="ant-form-item-control-input-content">
                                <input
                                  autoComplete="false"
                                  placeholder="NFT Name"
                                  className="ant-input ant-input-lg create-nft-input"
                                  maxLength={30}
                                  type="text"
                                  id="nftName"
                                  defaultValue=""
                                  name="nftName"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="ant-row ant-form-item form-item"
                          style={{ rowGap: 0 }}
                        >
                          <div className="ant-col ant-form-item-control">
                            <div className="ant-form-item-control-input">
                              <div className="ant-form-item-control-input-content">
                                <span className="ant-input-affix-wrapper ant-input-affix-wrapper-textarea-with-clear-btn">
                                  <textarea
                                    placeholder="NFT Description (max: 300 characters)"
                                    rows={7}
                                    id="nftDescription"
                                    name="nftDescription"
                                    className="ant-input create-nft-input-description"
                                  />
                                  <span
                                    role="button"
                                    aria-label="close-circle"
                                    tabIndex={-1}
                                    className="anticon anticon-close-circle ant-input-clear-icon-hidden ant-input-clear-icon"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="close-circle"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                                    </svg>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="ant-row ant-form-item form-item"
                          style={{ marginBottom: 0, rowGap: 0 }}
                        >
                          <div className="ant-col ant-col-24 ant-form-item-control">
                            <div className="ant-form-item-control-input">
                              <div className="ant-form-item-control-input-content">
                                <span className="ant-input-affix-wrapper ant-input-affix-wrapper-lg create-nft-input">
                                  <input
                                    autoComplete="true"
                                    placeholder="NFT Price"
                                    className="ant-input ant-input-lg"
                                    type="number"
                                    inputMode="decimal"
                                    step="0.0001"
                                    min="0.0001"
                                    max={10000000}
                                    id="nftPrice"
                                    name="nftPrice"
                                  />
                                  <span className="ant-input-suffix">BNB</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="ant-row ant-row-space-between create-bottom-row"
                        style={{ rowGap: 0 }}
                      >
                        <div>Service Fee</div>
                        <div>2.5%</div>
                      </div>
                      <div
                        className="ant-row ant-row-space-between create-bottom-row"
                        style={{ rowGap: 0 }}
                      >
                        <div>You will receive</div>
                        <div />
                      </div>
                    </div>
                    <div />
                    <div style={{ height: 8 }} />
                    <button
                      type="button"
                      className="ant-btn ant-btn-primary ant-btn-block nft-card-buy-button"
                      onClick={upload}
                    >
                      <span className="nft-card-buy-button-text">Approve</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
