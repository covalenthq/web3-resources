import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "";
styleInject(css_248z);

var img = "data:image/png;base64,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";

function TokenBalances(props) {
  const [data, getData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [props.address, props.chainId]);

  const handleImgError = e => {
    e.target.src = img;
  };

  const fetchData = () => {
    let headers = new Headers();
    let authString = `${props.apikey}:`;
    headers.set('Authorization', 'Basic ' + btoa(authString));
    const URL = `https://api.covalenthq.com/v1/${props.chainId}/address/${props.address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false`;
    fetch(URL, {
      method: 'GET',
      headers: headers
    }).then(res => res.json()).then(response => {
      getData(response.data.items);
    });
  };

  const columns = [{
    title: '',
    dataIndex: 'logo_url',
    key: 'logo_url',
    render: text => /*#__PURE__*/React.createElement("img", {
      src: text,
      onError: handleImgError,
      style: {
        width: '40px',
        height: '40px'
      }
    })
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
    sorter: (a, b) => a.balance - b.balance,
    render: (_, item) => /*#__PURE__*/React.createElement("td", null, Number.isInteger(item.balance / 10 ** item.contract_decimals) ? item.balance / 10 ** item.contract_decimals : (item.balance / 10 ** item.contract_decimals).toFixed(4))
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
    onFilter: (value, item) => item.type.startsWith(value)
  }, {
    title: 'Contract Address',
    dataIndex: 'contract_address',
    key: 'contract_address'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "balances"
  }, /*#__PURE__*/React.createElement(Table, {
    columns: columns,
    dataSource: data
  })));
}

export { TokenBalances };
