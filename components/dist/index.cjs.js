'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
require('antd/dist/antd.min.css');
var antd = require('antd');
var jsxRuntime = require('react/jsx-runtime');
var icons = require('@ant-design/icons');
var truncateEthAddress = require('truncate-eth-address');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var truncateEthAddress__default = /*#__PURE__*/_interopDefaultLegacy(truncateEthAddress);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var img = "data:image/png;base64,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";

var TokenBalances = function TokenBalances(_ref) {
  var address = _ref.address,
      chainId = _ref.chainId;

  var _useState = react.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      getData = _useState2[1];

  var _useState3 = react.useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var apiKey = process.env.REACT_APP_COVALENT_API_KEY;
  react.useEffect(function () {
    fetchData();
  }, [address, chainId]);

  var handleImgError = function handleImgError(e) {
    e.target.src = img;
  };

  var fetchData = function fetchData() {
    setIsLoading(true);
    var headers = new Headers();
    var authString = "".concat(apiKey, ":");
    headers.set('Authorization', 'Basic ' + btoa(authString));
    var URL = "https://api.covalenthq.com/v1/".concat(chainId, "/address/").concat(address, "/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false");
    fetch(URL, {
      method: 'GET',
      headers: headers
    }).then(function (res) {
      return res.json();
    }).then(function (response) {
      setIsLoading(false);
      getData(response.data.items);
    });
  };

  var columns = [{
    title: '',
    dataIndex: 'logo_url',
    key: 'logo_url',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("img", {
        src: text,
        onError: handleImgError,
        style: {
          width: '40px',
          height: '40px'
        }
      });
    }
  }, {
    title: 'Name',
    dataIndex: 'contract_name',
    key: 'contract_name'
  }, {
    title: 'Symbol',
    dataIndex: 'contract_ticker_symbol',
    key: 'contract_ticker_symbol'
  }, {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    sorter: function sorter(a, b) {
      return a.balance - b.balance;
    },
    render: function render(_, item) {
      return Number.isInteger(item.balance / Math.pow(10, item.contract_decimals)) ? item.balance / Math.pow(10, item.contract_decimals) : (item.balance / Math.pow(10, item.contract_decimals)).toFixed(4);
    }
  }, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    filters: [{
      text: 'cryptocurrency',
      value: 'cryptocurrency'
    }, {
      text: 'stablecoin',
      value: 'stablecoin'
    }, {
      text: 'nft',
      value: 'nft'
    }, {
      text: 'dust',
      value: 'dust'
    }],
    onFilter: function onFilter(value, item) {
      return item.type.startsWith(value);
    }
  }, {
    title: 'Contract Address',
    dataIndex: 'contract_address',
    key: 'contract_address'
  }];

  if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      loading: true
    });
  } else if (!isLoading && data) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      columns: columns,
      dataSource: data,
      rowKey: "contract_address"
    });
  }
};

var filterForTransfers = function filterForTransfers(res) {
  var txns = res.data.items; //Filter only the transactions whose log events contain "transfer" events

  var transfers = txns.filter(function (txn) {
    var txnLogEvents = txn.log_events; // //Filter out the empty log events, or those with too many log events

    if (txnLogEvents.length === 0 || txnLogEvents.length > 20) {
      return false;
    }

    var isTransfer;
    var logEventsBoolArray = txnLogEvents.map(function (logEvent) {
      if (logEvent.decoded) {
        //exclude decoded==null cases
        if (logEvent.decoded.name === "Transfer") {
          isTransfer = true;
        } else {
          isTransfer = false;
        }
      }

      return isTransfer;
    }); //If bool arr contains true, returns true -> filter accepts this entry and
    //it's added to transfers variable

    return logEventsBoolArray.includes(true) ? true : false;
  });
  return transfers; // an array
}; //Receives an array of transfers


var pruneTransfers = function pruneTransfers(transfersData, address) {
  //Maps through each transfer and returns an object array stored in `transfers`
  var transfers = transfersData.map(function (transfer) {
    var innerTransfersLogItem = []; //this will be an array of an array of params objects

    var transferFlow = transfer.from_address.toLowerCase() === address.toLowerCase() ? "Out" : "In";
    var transferLogEvent = transfer.log_events.filter(function (logEvent) {
      //Returns true only for those items that are transfer events.
      var isTransfer;

      if (logEvent.decoded) {
        if (logEvent.decoded.name === "Transfer") {
          isTransfer = true;
        } else {
          isTransfer = false;
        }
      }

      return isTransfer;
    });
    console.log("Transfer log event", transferLogEvent);
    var from = transferFlow === "Out" ? address : transfer.from_address;
    var to = transferFlow === "Out" ? transferLogEvent[0].decoded.params[1].value : address; //Notes on this field: this specifies where the funds are transferred to. Not the contract interacted with.

    var date = transfer.block_signed_at.slice(0, 10);
    var tokenName = transferLogEvent[0].sender_name;
    var tokenSymbol = transferLogEvent[0].sender_contract_ticker_symbol;
    var tokenLogo = transferLogEvent[0].sender_logo_url;
    var transferValue = parseInt(transferLogEvent[0].decoded.params[2].value) / Math.pow(10, parseInt(transferLogEvent[0].sender_contract_decimals));
    var tokenAddress = transferLogEvent[0].sender_address;
    var txnHash = transfer.tx_hash;
    var isERC721 = transferLogEvent[0].decoded.params[2].name == 'tokenId' ? true : false;

    var multiTransfersChecker = function multiTransfersChecker() {
      //this function checks whether the txn contains multiple transfers. Returns true when there's > 1 transfers events
      var transfersNum = 0;

      for (var i = 0; i < transfer.log_events.length; i++) {
        if (transfer.log_events[i].decoded === null) {
          return false;
        }

        if (transfer.log_events[i].decoded.name === "Transfer") {
          transfersNum++;
          innerTransfersLogItem.push(transfer.log_events[i]);
        }
      }

      return transfersNum > 1 ? true : false;
    };

    var isMultipleTransfers = multiTransfersChecker();
    var multipleTransfers = [];

    if (isMultipleTransfers) {
      multipleTransfers = innerTransfersLogItem.map(function (transfersItem) {
        var fromAddress = transfersItem.decoded.params[0].value;
        var toAddress = transfersItem.decoded.params[1].value;
        var amount = parseInt(transfersItem.decoded.params[2].value) / Math.pow(10, parseInt(transferLogEvent[0].sender_contract_decimals));
        var innerTokenLogo = transfersItem.sender_logo_url;
        var innerTokenName = transfersItem.sender_name;
        var logOffset = transfersItem.log_offset;
        return {
          fromAddress: fromAddress,
          toAddress: toAddress,
          amount: amount,
          innerTokenLogo: innerTokenLogo,
          innerTokenName: innerTokenName,
          logOffset: logOffset
        };
      });
    }

    multipleTransfers.sort(function (a, b) {
      return parseFloat(a.logOffset) - parseFloat(b.logOffset);
    }); // Sort the transfer events by the order in which they occur within the txn

    return {
      key: txnHash,
      date: date,
      transferFlow: transferFlow,
      from: from,
      to: to,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      tokenLogo: tokenLogo,
      transferValue: transferValue,
      tokenAddress: tokenAddress,
      txnHash: txnHash,
      isMultipleTransfers: isMultipleTransfers,
      isERC721: isERC721,
      multipleTransfers: multipleTransfers
    };
  });
  var transfersWithoutNFTs = transfers.filter(function (transfer) {
    return !transfer.isERC721;
  });
  return transfersWithoutNFTs;
};

var handleImgError = function handleImgError(e) {
  e.target.src = "https://res.cloudinary.com/dl4murstw/image/upload/v1659590465/default-logo_om9kbi.png";
};

var multiTransfersTableColumns = function multiTransfersTableColumns(blockexplorerURL) {
  var columns = [{
    title: 'From',
    dataIndex: 'fromAddress',
    key: 'from',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'To',
    dataIndex: 'toAddress',
    key: 'to',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  }, {
    title: 'Token Logo',
    dataIndex: 'innerTokenLogo',
    key: 'tokenLogo',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("img", {
        alt: "token logo",
        onError: handleImgError,
        src: text,
        width: "40"
      });
    }
  }, {
    title: 'Token Name',
    dataIndex: 'innerTokenName',
    key: 'tokenName'
  }];
  return columns;
};

var blockExplorerURLs = [{
  chainId: 1,
  url: 'https://etherscan.io/'
}, {
  chainId: 42,
  url: 'https://kovan.etherscan.io/'
}, {
  chainId: 137,
  url: 'https://polygonscan.com/'
}, {
  chainId: 80001,
  url: 'https://mumbai.polygonscan.com/'
}, {
  chainId: 43114,
  url: 'https://snowtrace.io/'
}, {
  chainId: 43113,
  url: 'https://testnet.snowtrace.io/'
}, {
  chainId: 56,
  url: 'https://www.bscscan.com/'
}, {
  chainId: 97,
  url: 'https://testnet.bscscan.com/'
}, {
  chainId: 1284,
  url: 'https://moonscan.io/'
}, {
  chainId: 1287,
  url: 'https://moonbase-blockscout.testnet.moonbeam.network/'
}, {
  chainId: 1285,
  url: 'https://blockscout.moonriver.moonbeam.network/'
}, {
  chainId: 30,
  url: 'https://explorer.rsk.co/'
}, {
  chainId: 31,
  url: 'https://explorer.testnet.rsk.co/'
}, {
  chainId: 42161,
  url: 'https://arbiscan.io/'
}, {
  chainId: 421611,
  url: 'https://testnet.arbiscan.io/'
}, {
  chainId: 250,
  url: 'https://explorer.fantom.network/'
}, {
  chainId: 4002,
  url: 'https://testnet.ftmscan.com/'
}, {
  chainId: 11297108109,
  url: 'https://explorer.palm.io/'
}, {
  chainId: 11297108099,
  url: 'https://blockscout.com/poa/sokol'
}, {
  chainId: 8217,
  url: 'https://scope.klaytn.com/'
}, {
  chainId: 128,
  url: 'https://www.hecoinfo.com/'
}, {
  chainId: 256,
  url: 'https://scan-testnet.hecochain.com/home/index'
}, {
  chainId: 2020,
  url: 'https://explorer.roninchain.com/'
}, {
  chainId: 9001,
  url: 'https://evm.evmos.org/'
}, {
  chainId: 9000,
  url: 'https://evm.evmos.dev/'
}, {
  chainId: 592,
  url: 'https://astar.subscan.io/'
}, {
  chainId: 336,
  url: 'https://shiden.subscan.io/'
}, {
  chainId: 4689,
  url: 'https://iotexscan.io/'
}, {
  chainId: 4690,
  url: 'https://testnet.iotexscan.io/'
}, {
  chainId: 1666600000,
  url: 'https://explorer.harmony.one/'
}, {
  chainId: 1666700000,
  url: 'https://explorer.pops.one/'
}, {
  chainId: 25,
  url: 'https://cronoscan.com/'
}];
var erc20TransfersHelper = {
  filterForTransfers: filterForTransfers,
  pruneTransfers: pruneTransfers,
  multiTransfersTableColumns: multiTransfersTableColumns,
  blockExplorerURLs: blockExplorerURLs
};

var ERC20Transfers = function ERC20Transfers(_ref) {
  var address = _ref.address,
      chainId = _ref.chainId;
  var blockexplorerURL = erc20TransfersHelper.blockExplorerURLs.filter(function (item) {
    return parseInt(item.chainId) === parseInt(chainId);
  })[0].url;

  var _useState = react.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      txnData = _useState2[0],
      setTxnData = _useState2[1];

  var _useState3 = react.useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var apiKey = process.env.REACT_APP_COVALENT_API_KEY;
  var transactionsDataUrl = "https://api.covalenthq.com/v1/".concat(chainId, "/address/").concat(address, "/transactions_v2/");

  var handleImgError = function handleImgError(e) {
    e.target.src = img;
  };

  var fetchData = function fetchData() {
    setIsLoading(true);
    var headers = new Headers();
    var authString = "".concat(apiKey, ":");
    headers.set('Authorization', 'Basic ' + btoa(authString));
    fetch(transactionsDataUrl, {
      method: 'GET',
      headers: headers
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      var transfersData = erc20TransfersHelper.filterForTransfers(res);
      var transfers = erc20TransfersHelper.pruneTransfers(transfersData, address);
      setIsLoading(false);
      setTxnData(transfers);
    }).catch(function (err) {
      return console.log(err.message);
    });
  };

  react.useEffect(function () {
    fetchData();
  }, [address]);
  var columns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  }, {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: function render(text, record) {
      if (!record.isMultipleTransfers) {
        return /*#__PURE__*/jsxRuntime.jsx("a", {
          href: blockexplorerURL + 'address/' + text,
          target: "_blank",
          rel: "noopener noreferrer",
          children: truncateEthAddress__default["default"](text)
        });
      } else {
        //This is the content that we provide to the popover table.
        var multiTransfersContent = /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [/*#__PURE__*/jsxRuntime.jsx(antd.Table, {
            dataSource: record.multipleTransfers,
            columns: erc20TransfersHelper.multiTransfersTableColumns(blockexplorerURL)
          }), /*#__PURE__*/jsxRuntime.jsx(icons.InfoCircleOutlined, {}), /*#__PURE__*/jsxRuntime.jsx("em", {
            children: " There are multiple transfer events in this single transaction."
          })]
        });

        return /*#__PURE__*/jsxRuntime.jsx(antd.Popover, {
          placement: "rightBottom",
          content: multiTransfersContent,
          trigger: "focus",
          children: /*#__PURE__*/jsxRuntime.jsxs(antd.Button, {
            children: [" ", /*#__PURE__*/jsxRuntime.jsxs("span", {
              children: [/*#__PURE__*/jsxRuntime.jsx(icons.WarningOutlined, {
                style: {
                  fontSize: '1em'
                }
              }), " Multiple"]
            })]
          })
        });
      }
    }
  }, {
    title: 'Flow',
    dataIndex: 'transferFlow',
    key: 'transferFlow'
  }, {
    title: 'Token Address',
    dataIndex: 'tokenAddress',
    key: 'tokenAddress',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'address/' + text,
        target: "_blank",
        rel: "noopener noreferrer",
        children: truncateEthAddress__default["default"](text)
      });
    }
  }, {
    title: 'Token Logo',
    dataIndex: 'tokenLogo',
    key: 'tokenLogo',
    render: function render(text) {
      return /*#__PURE__*/jsxRuntime.jsx("img", {
        alt: "token logo",
        onError: handleImgError,
        src: text,
        width: "40"
      });
    }
  }, {
    title: 'Token Name',
    dataIndex: 'tokenName',
    key: 'tokenName'
  }, {
    title: 'Token Symbol',
    dataIndex: 'tokenSymbol',
    key: 'tokenSymbol'
  }, {
    title: 'Amount',
    dataIndex: 'transferValue',
    key: 'transferValue'
  }, {
    title: 'Transaction',
    dataIndex: 'txnHash',
    key: 'txnHash',
    render: function render(txnHash) {
      return /*#__PURE__*/jsxRuntime.jsx("a", {
        href: blockexplorerURL + 'tx/' + txnHash,
        target: "_blank",
        rel: "noopener noreferrer",
        children: " View Transaction"
      });
    }
  }];

  if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      loading: true
    });
  } else if (!isLoading && txnData) {
    console.log("txnData", txnData);
    return /*#__PURE__*/jsxRuntime.jsx(antd.Table, {
      dataSource: txnData,
      columns: columns,
      rowKey: "txnHash"
    });
  }
};

exports.ERC20Transfers = ERC20Transfers;
exports.TokenBalances = TokenBalances;
