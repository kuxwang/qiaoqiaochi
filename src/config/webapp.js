//判断浏览器
export var _env = (function () {
  var f = navigator.userAgent,
    b = null,
    c = function (h, i) {
      var g = h.split(i);
      g = g.shift() + "." + g.join("");
      return g * 1
    },
    d = {
      ua: f,
      version: null,
      mobile: false,
      ios: false,
      android: false,
      windows: false,
      blackberry: false,
      meizu: false,
      weixin: false,
      wVersion: null,
      touchSupport: ("createTouch" in document),
      hashSupport: !!("onhashchange" in window),
      wshoto: false
    };
  b = f.match(/AppleWebKit.*Mobile.*\/([\.0-9]+)\s/);
  if (b !== null) {
    d.mobile = true;
    d.wVersion = c(b[1], ".")
  }
  b = f.match(/MicroMessenger\/([\.0-9]+)/);
  if (b !== null) {
    d.weixin = true;
    d.wVersion = c(b[1], ".")
  }
  b = f.indexOf("wshoto");
  if (b > 0) {
    d.wshoto = true;
  }
  b = f.match(/Android\s([\.0-9]+)/);
  if (b !== null) {
    d.android = true;
    d.version = c(b[1], ".");
    d.meizu = /M030|M031|M032|MEIZU/.test(f);
    return d
  }
  b = f.match(/i(Pod|Pad|Phone)\;.*\sOS\s([\_0-9]+)/);
  if (b !== null) {
    d.ios = true;
    d.version = c(b[2], "_");
    return d
  }
  b = f.match(/Windows\sPhone\sOS\s([\.0-9]+)/);
  if (b !== null) {
    d.windows = true;
    d.version = c(b[1], ".");
    return d
  }
  var e = {
    a: f.match(/\(BB1\d+\;\s.*\sVersion\/([\.0-9]+)\s/),
    b: f.match(/\(BlackBerry\;\s.*\sVersion\/([\.0-9]+)\s/),
    c: f.match(/^BlackBerry\d+\/([\.0-9]+)\s/),
    d: f.match(/\(PlayBook\;\s.*\sVersion\/([\.0-9]+)\s/)
  };
  for (var a in e) {
    if (e[a] !== null) {
      b = e[a];
      d.blackberry = true;
      d.version = c(b[1], ".");
      return d
    }
  }
  return d
}());

export var _webapp = {

  init: false,

  log: function (message, data) {
    alert(message);

    if (typeof data !== 'undefined') {
      alert(JSON.stringify(data));
    }
  },

  requestx: function (params, callback) {
    var handler = 'requestx';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {params: params}, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, {params: params}, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (response, responseCallback) {
          responseCallback('get requestx callback');
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });

      });
    }
  },

  locationCity: function () {
    var handler = 'locationCity';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, function (response) {
          //response = eval('(' + response + ')');
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (response) {
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });
      });
    }
  },


  /**
   * 根据不同key值存储不同val值，val值将会以object(json)数据类型进行返回。\
   * 若设置本地存储内容失效时，val 值请填写空字符串 '';
   * @param key
   * @param val
   * @param callback
   */
  setStorageSync: function (key, val, callback) {
    var handler = 'setStorageSync';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {key: key, val: val}, function (response) {
          return _webapp.callback(response, callback);
        });
      });
    }
    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }
        bridge.callHandler(handler, {key: key, val: val}, function (response) {
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });

      });
    }
  },
  frame: function (callback) {
    var handler = 'frame';
    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);

          });
        }

        bridge.registerHandler(handler, function (response, responseCallback) {
          responseCallback(response);
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });
      });
    }

  },
  setLat: function (id, params, callback) {
    var handler = 'setLat';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {id: id, params: params}, function (response) {
          return _webapp.callback(response, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          //$('#msg').append("INIT RUN. <hr><br />");
          bridge.init(function (message, responseCallback) {
            //  $('#msg').append("init run message: "  + message + "<hr><br />");
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }
        //初始化
        bridge.callHandler(handler, {id: id, params: params}, function (response) {
          response = eval('(' + response + ')');

          return _webapp.callback(response, callback);
        });

      });
    }
  },
  setStore: function (id, params, callback) {
    var handler = 'setStore';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {id: id, params: params}, function (response) {
          return _webapp.callback(response, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }
        bridge.callHandler(handler, {id: id, params: params}, function (response) {
          response = eval('(' + response + ')');

          return _webapp.callback(response, callback);
        });

      });
    }
  },
  uploadImg: function (callback) {
    var handler = 'uploadImg';
    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);

          });
        }

        bridge.callHandler(handler, function (response) {
          //response = eval('(' + response + ')');
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (response) {
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });
      });
    }

  },
  backHistory: function (callback) {
    var handler = 'backHistory';
    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, function (response) {
        });

      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }
        bridge.callHandler(handler, function (response) {
        });
      });
    }
  },
  setDisease: function (url, callback) {
    var handler = 'setDisease';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {url: url}, function (response) {
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }
        bridge.callHandler(handler, {url: url}, function (response) {
        });


      });
    }
  },
  /**
   * 与setStorageSync一致，根据key值获取本地存储val内容。
   * @param key
   * @param callback
   */
  getStorageSync: function (key, callback) {
    var handler = 'getStorageSync';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, key, function (response) {
          return _webapp.callback(response, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {

        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;

          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, key, function (response) {
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });

      });
    }
  },


  /**
   * 第三方JS自动登陆调起
   * @param type
   * @param callback
   */
  authLogin: function (type, callback) {
    var handler = 'authLogin';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {type: type}, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;

          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, {type: type}, function (response) {
          // response = eval('(' + response + ')');
          // _webapp.callback(response, callback);
          // _webapp.log('call response', response);
        });

        bridge.registerHandler(handler, function (response, responseCallback) {
          responseCallback(response);
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });

      });
    }
  },

  /**
   *
   * @param type # 可选参数为 wechat / alipay (若有其他增加，请补充此备注)
   * @param params
   * @param callback
   */
  payment: function (type, params, callback) {
    var handler = 'payment';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {type: type, params: params}, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, {type: type, params: params}, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (response, responseCallback) {
          responseCallback('get payment callback');
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });

      });
    }
  },

  setupWebViewJavascriptBridge: function (callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  },

  connectWebViewJavascriptBridge: function (callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function () {
          callback(WebViewJavascriptBridge)
        },
        false
      );
    }
  },

  callback: function (res, cb) {
    if (typeof cb === "object" || typeof cb === "function") {
      if (typeof cb === "function") {
        cb(res);
        return true;
      }

      if (res.statusCode === 0) {
        if (typeof cb.success === "function") {
          cb.success(res);
        }
      } else {
        if (typeof cb.fail === "function") {
          cb.fail(res);
        }
      }

      if (typeof cb.complete === 'function') {
        cb.complete(res);
      }
    }

    return res;
  },
  //退出登录
  //退出登录
  // logOut: function () {
  //   var handler = 'logOut';
  //
  //   if (_env.ios) {
  //     _webapp.setupWebViewJavascriptBridge(function (bridge) {
  //       bridge.callHandler(handler, function (response) {
  //         //return _webapp.callback(response, callback);
  //       });
  //
  //       bridge.registerHandler(handler, function (data) {
  //         return _webapp.callback(data, callback);
  //       });
  //     });
  //   }
  //
  //   if (_env.android) {
  //     _webapp.connectWebViewJavascriptBridge(function (bridge) {
  //       if (_webapp.init === false) {
  //         //初始化
  //         _webapp.init = true;
  //         bridge.init(function (message, responseCallback) {
  //           var data = {
  //             'Javascript Responds': 'Wee!'
  //           };
  //           responseCallback(data);
  //         });
  //       }
  //
  //       bridge.callHandler(handler, function (response) {
  //         //response = eval('(' + response + ')');
  //         //return _webapp.callback(response, callback);
  //       });
  //
  //       bridge.registerHandler(handler, function (response) {
  //         response = eval('(' + response + ')');
  //         return _webapp.callback(response, callback);
  //       });
  //     });
  //   }
  // },
  shellQrcode: function (url) {
    var handler = 'shellQrcode';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, {params: url}, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, {params: url}, function (response) {
          //response = eval('(' + response + ')');
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (response) {
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });
      });
    }
  },
  //退出登录
  logOut: function () {
    var handler = 'logOut';

    if (_env.ios) {
      _webapp.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(handler, function (response) {
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (data) {
          return _webapp.callback(data, callback);
        });
      });
    }

    if (_env.android) {
      _webapp.connectWebViewJavascriptBridge(function (bridge) {
        if (_webapp.init === false) {
          //初始化
          _webapp.init = true;
          bridge.init(function (message, responseCallback) {
            var data = {
              'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
          });
        }

        bridge.callHandler(handler, function (response) {
          //response = eval('(' + response + ')');
          //return _webapp.callback(response, callback);
        });

        bridge.registerHandler(handler, function (response) {
          response = eval('(' + response + ')');
          return _webapp.callback(response, callback);
        });
      });
    }
  }
};
