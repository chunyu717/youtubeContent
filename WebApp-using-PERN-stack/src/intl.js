import React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import ja from "react-intl/locale-data/ja";

import App from './App';
import { BrowserRouter, Route } from 'react-router-dom' ; 

addLocaleData([...en, ...zh, ...ja]);

const Intl = ({locale, messages}) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>
          <div>
              <Route exact path="/" component={App}/>
          </div>
        </BrowserRouter>
      </IntlProvider>
  );
};

export default connect( ({langs: { locale, messages }}) => ({ locale, messages }) )(Intl);