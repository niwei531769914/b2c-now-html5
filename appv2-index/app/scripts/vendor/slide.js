var slide = (function() {
	var a = function(c) {
		return new b(c)
	};

	function b(c) {
		this.elem = c;
		this.oBox = document.querySelector(c);
		this.aLi = document.querySelectorAll(c + " [data-ul-child=child]");
		this.oUl = document.querySelector(c + " [data-slide-ul=firstUl]");
		this.now = 0;
		this.on0ff = false
	}
	b.prototype = {
		init: function(c) {
			var c = c || {},
				e = this.aLi;
			this.defaults = {
				startIndex: 0,
				loop: false,
				smallBtn: false,
				number: false,
				laseMoveFn: false,
				location: false,
				preDef: "lnr",
				autoPlay: false,
				autoHeight: false,
				preFn: null,
				lastImgSlider: false,
				playTime: 6000,
				callback: null,
				verticalCenter: false,
				fullScreen: true,
				total: 0
			};
			b.extend(this.defaults, c);
			this.now = this.defaults.startIndex;
			this.initBtn();
			this.liInit();
			this.bind();
			if (this.aLi.length < 2) {
				if (this.defaults.smallBtn) {
					this.oSmallBtn.style.display = "none"
				}
				if (this.defaults.number) {
					this.pageNub.style.display = "none"
				}
				this.defaults.autoPlay = false;
				this.defaults.loop = false
			}
			if (this.defaults.autoPlay) {
				this.pause();
				this.play()
			}
		},
		initBtn: function() {
			this.aLi = document.querySelectorAll(this.elem + " [data-ul-child=child]");
			var e = this.aLi;
			if (this.defaults.callback) {
				this.defaults.callback(1)
			}
			if (this.defaults.smallBtn) {
				this.oSmallBtn = document.querySelector(this.elem + ' [data-small-btn="smallbtn"]');
				this.oSmallBtn.innerHTML = this.addSmallBtn();
				this.btns = document.querySelectorAll(this.elem + ' [data-ol-btn="btn"]');
				for (var c = 0; c < this.btns.length; c++) {
					this.btns[c].className = ""
				}
				this.btns[b.getNow(this.now, e.length)].className = "active"
			}
			if (this.defaults.number) {
				this.pageNub = document.getElementById("page-nub");
				this.slideNub = document.getElementById("slide-nub");
				this.slideSum = document.getElementById("slide-sum");
				this.slideNub.innerHTML = (this.now + 1) % (this.aLi.length);
				this.slideSum.innerHTML = this.aLi.length
			}
			this.defaults.total = this.aLi.length;
			if (this.aLi.length == 2 || this.aLi.length == 3) {
				if (this.defaults.loop) {
					this.oUl.innerHTML += this.oUl.innerHTML
				}
				this.aLi = document.querySelectorAll(this.elem + " [data-ul-child=child]");
				this.need = true
			}
		},
		bind: function() {
			var g = this.oBox,
				f = b._device();
			if (!f.hasTouch) {
				g.style.cursor = "pointer";
				g.ondragstart = function(h) {
					if (h) {
						return false
					}
					return true
				}
			}
			var e = "onorientationchange" in window;
			var c = e ? "orientationchange" : "resize";
			window.addEventListener(c, this);
			if (this.aLi.length < 2) {
				if (this.defaults.smallBtn) {
					this.oSmallBtn.style.display = "none"
				}
				if (this.defaults.number) {
					this.pageNub.style.display = "none"
				}
				return
			}
			g.addEventListener(f.startEvt, this);
			window.addEventListener("touchcancel", this);
			if (navigator.userAgent.indexOf("baidubrowser") != -1) {
				window.addEventListener("focusin", this);
				window.addEventListener("focusout", this)
			} else {
				window.addEventListener("blur", this);
				window.addEventListener("focus", this)
			}
		},
		liInit: function() {
			var f = this.aLi,
				h = f.length,
				c = this.aLi[0].offsetWidth,
				l = this.aLi[0].offsetHeight,
				p = this.oUl,
				o = this.oBox.offsetWidth,
				e = 320,
				g = this.now,
				n = this;
			if (this.defaults.preFn) {
				this.defaults.preFn()
			}
			for (var k = 0; k < h; k++) {
				b.setStyle(f[k], {
					WebkitTransition: "all 0ms ease",
					transition: "all 0ms ease",
					height: "100%"
				})
			}
			if (this.defaults.fullScreen) {
				p.style.width = o * h + "px";
				if (this.defaults.autoHeight) {
					e = this.oBox.offsetWidth;
					if (e >= 640) {
						e = 640
					}
					for (var k = 0; k < h; k++) {
						f[k].style.width = e + "px"
					}
					var m = f[0].getElementsByTagName("img")[0];
					if (m) {
						var j = new Image();
						j.onload = function() {
							n.oBox.style.height = f[0].offsetHeight + "px";
							n.oUl.style.height = f[0].offsetHeight + "px";
							if (n.defaults.verticalCenter) {
								if (n.oBox.style.height.replace("px", "") >= document.documentElement.clientHeight) {
									n.oBox.parentNode.style.top = "50px";
									n.oBox.parentNode.style.marginTop = 0
								} else {
									n.oBox.parentNode.style.top = "50%";
									n.oBox.parentNode.style.marginTop = "-50%"
								}
							}
							for (var q = 0; q < f.length; q++) {
								f[q].style.height = f[0].offsetHeight + "px"
							}
						};
						j.src = m.src
					} else {
						this.oBox.style.height = f[0].offsetHeight + "px"
					}
				}
			} else {
				e = this.oBox.offsetWidth;
				if (e >= 640) {
					e = 640
				}
				c = (e / 320) * 225;
				l = (e / 320) * 150;
				for (var k = 0; k < h; k++) {
					f[k].style.width = c + "px";
					f[k].style.height = l + "px"
				}
				p.style.width = c * h + "px";
				this.oBox.style.height = l + "px";
				this.oUl.style.height = l + "px";
				f[0].style.padding = "0";
				o = c
			}
			if (this.defaults.loop) {
				for (var k = 0; k < h; k++) {
					b.setStyle(f[k], {
						position: "absolute",
						left: 0,
						top: 0
					});
					if (k == b.getNow(g, h)) {
						b.setStyle(f[k], {
							WebkitTransform: "translate3d(" + 0 + "px, 0px, 0px)",
							transform: "translate3d(" + 0 + "px, 0px, 0px)",
							zIndex: 10
						})
					} else {
						if (k == b.getPre(g, h)) {
							b.setStyle(f[k], {
								WebkitTransform: "translate3d(" + -o + "px, 0px, 0px)",
								transform: "translate3d(" + -o + "px, 0px, 0px)",
								zIndex: 10
							})
						} else {
							if (k == b.getNext(g, h)) {
								b.setStyle(f[k], {
									WebkitTransform: "translate3d(" + o + "px, 0px, 0px)",
									transform: "translate3d(" + o + "px, 0px, 0px)",
									zIndex: 10
								})
							} else {
								if (k == b.getNextNew(g, h)) {
									b.setStyle(f[k], {
										WebkitTransform: "translate3d(" + o * 2 + "px, 0px, 0px)",
										transform: "translate3d(" + o * 2 + "px, 0px, 0px)",
										zIndex: 10
									})
								} else {
									b.setStyle(f[k], {
										WebkitTransform: "translate3d(" + -o + "px, 0px, 0px)",
										transform: "translate3d(" + -o + "px, 0px, 0px)",
										zIndex: 9
									})
								}
							}
						}
					}
				}
			} else {
				for (var k = 0; k < h; k++) {
					b.setStyle(f[k], {
						WebkitTransform: "translate3d(" + g * -o + "px, 0px, 0px)",
						transform: "translate3d(" + g * -o + "px, 0px, 0px)"
					})
				}
			}
		},
		handleEvent: function(e) {
			var c = b._device(),
				f = this.oBox;
			switch (e.type) {
				case c.startEvt:
					if (this.defaults.autoPlay) {
						this.pause()
					}
					this.startHandler(e);
					break;
				case c.moveEvt:
					if (this.defaults.autoPlay) {
						this.pause()
					}
					this.moveHandler(e);
					break;
				case c.endEvt:
					if (this.defaults.autoPlay) {
						this.pause();
						this.play()
					}
					this.endHandler(e);
					break;
				case "touchcancel":
					if (this.defaults.autoPlay) {
						this.pause();
						this.play()
					}
					this.endHandler(e);
					break;
				case "orientationchange":
					this.orientationchangeHandler();
					break;
				case "resize":
					this.orientationchangeHandler();
					break;
				case "focus":
					if (this.defaults.autoPlay) {
						this.pause();
						this.play()
					}
					break;
				case "blur":
					if (this.defaults.autoPlay) {
						this.pause()
					}
					break;
				case "focusin":
					if (this.defaults.autoPlay) {
						this.pause();
						this.play()
					}
					break;
				case "focusout":
					if (this.defaults.autoPlay) {
						this.pause()
					}
					break
			}
		},
		startHandler: function(f) {
			this.on0ff = true;
			var e = b._device(),
				g = e.hasTouch,
				i = this.oBox,
				c = this.now,
				h = this.aLi;
			i.addEventListener(e.moveEvt, this);
			i.addEventListener(e.endEvt, this);
			this.downTime = Date.now();
			this.downX = g ? f.targetTouches[0].pageX : f.clientX - i.offsetLeft;
			this.downY = g ? f.targetTouches[0].pageY : f.clientY - i.offsetTop;
			this.startT = b.getTranX(h[b.getNow(c, h.length)]);
			this.startNowT = b.getTranX(h[b.getNow(c, h.length)]);
			this.startPreT = b.getTranX(h[b.getPre(c, h.length)]);
			this.startNextT = b.getTranX(h[b.getNext(c, h.length)]);
			this.startNextN = b.getTranX(h[b.getNextNew(c, h.length)]);
			b.stopPropagation(f)
		},
		moveHandler: function(r) {
			var o = this.oBox,
				f = b._device();
			if (this.on0ff) {
				var p = f.hasTouch;
				var k = p ? r.targetTouches[0].pageX : r.clientX - o.offsetLeft;
				var j = p ? r.targetTouches[0].pageY : r.clientY - o.offsetTop;
				var c = this.aLi,
					h = c.length,
					e = this.now,
					u = c[0].offsetWidth;
				if (this.defaults.preDef == "all") {
					b.stopDefault(r)
				}
				for (var n = 0; n < h; n++) {
					b.setStyle(c[n], {
						WebkitTransition: "all 0ms ease",
						transition: "all 0ms ease"
					})
				}
				if (Math.abs(k - this.downX) < Math.abs(j - this.downY)) {
					if (this.defaults.preDef == "tnd" && this.defaults.preDef != "all") {
						b.stopDefault(r)
					}
				} else {
					if (Math.abs(k - this.downX) > 10) {
						if (this.defaults.preDef == "lnr" && this.defaults.preDef != "all") {
							b.stopDefault(r)
						}
						if (this.defaults.loop) {
							l = (this.startNowT + k - this.downX).toFixed(4);
							var t = (this.startPreT + k - this.downX).toFixed(4);
							var g = (this.startNextT + k - this.downX).toFixed(4);
							var m = (this.startNextN + k - this.downX).toFixed(4);
							b.move(c[b.getNow(e, h)], l, 10, this.defaults.fullScreen);
							b.move(c[b.getPre(e, h)], t, 10, this.defaults.fullScreen);
							b.move(c[b.getNext(e, h)], g, 10, this.defaults.fullScreen);
							b.move(c[b.getNextNew(e, h)], m, 10, this.defaults.fullScreen)
						} else {
							var l = b.getTranX(c[e]);
							if (l > 0) {
								var q = ((this.startT + k - this.downX) / 3).toFixed(4);
								for (var n = 0; n < h; n++) {
									b.move(c[n], q)
								}
							} else {
								if (Math.abs(l) >= Math.abs((h - 1) * u)) {
									var q = (this.startT + (k - this.downX) / 3).toFixed(4);
									for (var n = 0; n < h; n++) {
										b.move(c[n], q)
									}
									if (this.defaults.laseMoveFn && typeof this.defaults.laseMoveFn == "function") {
										var s = (q - this.startT).toFixed(4);
										this.defaults.laseMoveFn(s)
									}
								} else {
									var q = (this.startT + k - this.downX).toFixed(4);
									for (var n = 0; n < h; n++) {
										b.move(c[n], q)
									}
								}
							}
						}
					}
				}
			} else {
				o.removeEventListener(f.moveEvt, this);
				o.removeEventListener(f.endEvt, this)
			}
			b.stopPropagation(r)
		},
		endHandler: function(j) {
			j.stopPropagation();
			this.on0ff = false;
			var g = Date.now(),
				f = b._device(),
				i = f.hasTouch,
				h = this.oBox,
				m = i ? j.changedTouches[0].pageX : j.clientX - h.offsetLeft,
				l = i ? j.changedTouches[0].pageY : j.clientY - h.offsetTop,
				c = this.aLi,
				k = c[0].offsetWidth,
				e = b.getTranX(c[b.getNow(this.now, c.length)]);
			if (m - this.downX < 30 && m - this.downX >= 0 && Math.abs(l - this.downY) < 30) {
				this.tab(e, "+=");
				return "click"
			} else {
				if (m - this.downX > -30 && m - this.downX <= 0 && Math.abs(l - this.downY) < 30) {
					this.tab(e, "-=");
					return "click"
				} else {
					if (Math.abs(l - this.downY) - Math.abs(m - this.downX) > 30 && m - this.downX < 0) {
						this.tab(e, "-=");
						return
					}
					if (Math.abs(l - this.downY) - Math.abs(m - this.downX) > 30 && m - this.downX > 0) {
						this.tab(e, "+=");
						return
					}
					if (m < this.downX) {
						if (this.downX - m > k / 3 || g - this.downTime < 200) {
							this.now++;
							this.tab(e, "++");
							return "left"
						} else {
							this.tab(e, "+=");
							return "stay"
						}
					} else {
						if (m - this.downX > k / 3 || g - this.downTime < 200) {
							this.now--;
							this.tab(e, "--");
							return "right"
						} else {
							this.tab(e, "-=");
							return "stay"
						}
					}
				}
			}
			b.stopPropagation(j);
			h.removeEventListener(f.moveEvt, this);
			h.removeEventListener(f.endEvt, this)
		},
		tab: function(f, m, g) {
			var c = this.aLi,
				l = c.length,
				s = c[0].offsetWidth,
				r = this.oBox,
				h = b._device(),
				q = this,
				e = this.now;
			if (this.defaults.callback && (m == "++" || m == "--")) {
				this.defaults.callback((b.getNow(e, l) + 1) % this.defaults.total == 0 ? this.defaults.total : (b.getNow(e, l) + 1) % this.defaults.total)
			}
			$(c[b.getNow(q.now, l)]).addClass("active").siblings().removeClass("active");
			if (this.defaults.loop) {
				if (e < 0) {
					e = l - 1;
					this.now = l - 1
				}
				for (var p = 0; p < l; p++) {
					if (p == b.getPre(e, l)) {
						var k;
						switch (m) {
							case "++":
								k = 300;
								break;
							case "--":
								k = 0;
								break;
							case "+=":
								k = 0;
								break;
							case "-=":
								k = 300;
								break;
							default:
								break
						}
						b.setStyle(c[b.getPre(e, l)], {
							WebkitTransform: "translate3d(" + -s + "px, 0px, 0px)",
							transform: "translate3d(" + -s + "px, 0px, 0px)",
							zIndex: 10,
							WebkitTransition: "all " + k + "ms ease",
							transition: "all " + k + "ms ease"
						});
						if (!q.defaults.fullScreen) {
							b.setStyle(c[b.getPre(e, l)], {
								padding: "0.8%"
							})
						}
					} else {
						if (p == b.getNow(e, l)) {
							b.setStyle(c[b.getNow(e, l)], {
								WebkitTransform: "translate3d(" + 0 + "px, 0px, 0px)",
								transform: "translate3d(" + 0 + "px, 0px, 0px)",
								zIndex: 10,
								WebkitTransition: "all " + 300 + "ms ease",
								transition: "all " + 300 + "ms ease"
							});
							if (!q.defaults.fullScreen) {
								b.setStyle(c[b.getNow(e, l)], {
									padding: "0"
								})
							}
						} else {
							if (p == b.getNext(e, l)) {
								var k = 300;
								switch (m) {
									case "++":
										k = 0;
										break;
									case "--":
										k = 300;
										break;
									case "+=":
										k = 300;
										break;
									case "-=":
										k = 0;
										break;
									default:
										break
								}
								b.setStyle(c[b.getNext(e, l)], {
									WebkitTransform: "translate3d(" + s + "px, 0px, 0px)",
									transform: "translate3d(" + s + "px, 0px, 0px)",
									zIndex: 10,
									WebkitTransition: "all " + k + "ms ease",
									transition: "all " + k + "ms ease"
								});
								if (!q.defaults.fullScreen) {
									b.setStyle(c[b.getNext(e, l)], {
										padding: "0.8%"
									})
								}
							} else {
								if (p == b.getNextNew(e, l)) {
									var k;
									switch (m) {
										case "++":
											k = 0;
											break;
										case "--":
											k = 300;
											break;
										case "+=":
											k = 300;
											break;
										case "-=":
											k = 0;
											break;
										default:
											break
									}
									b.setStyle(c[b.getNextNew(e, l)], {
										WebkitTransform: "translate3d(" + s * 2 + "px, 0px, 0px)",
										transform: "translate3d(" + s * 2 + "px, 0px, 0px)",
										zIndex: 10,
										WebkitTransition: "all " + k + "ms ease",
										transition: "all " + k + "ms ease"
									});
									if (!q.defaults.fullScreen) {
										b.setStyle(c[b.getNextNew(e, l)], {
											padding: "0.8%"
										})
									}
								} else {
									b.setStyle(c[p], {
										WebkitTransform: "translate3d(" + s * 2 + "px, 0px, 0px)",
										transform: "translate3d(" + s * 2 + "px, 0px, 0px)",
										zIndex: 9,
										WebkitTransition: "all " + 0 + "ms ease",
										transition: "all " + 0 + "ms ease"
									})
								}
							}
						}
					}
				}
			} else {
				for (var p = 0; p < l; p++) {
					b.setStyle(c[p], {
						WebkitTransition: "all " + 300 + "ms ease",
						transition: "all " + 300 + "ms ease"
					})
				}
				if (e <= 0) {
					e = 0;
					this.now = 0
				}
				if (e > l - 1) {
					if (g) {
						e = 0;
						this.now = 0
					} else {
						e = l - 1;
						this.now = l - 1
					}
				}
				for (var o = 0; o < l; o++) {
					b.setStyle(c[o], {
						WebkitTransform: "translate3d(" + (-e * s) + "px, 0px, 0px)",
						transform: "translate3d(" + (-e * s) + "px, 0px, 0px)"
					})
				}
			}
			if (this.defaults.smallBtn) {
				for (var p = 0; p < this.btns.length; p++) {
					this.btns[p].className = ""
				}
				if (this.need) {
					this.btns[b.getNow(e, l / 2)].className = "active"
				} else {
					this.btns[b.getNow(e, l)].className = "active"
				}
			}
			if (this.defaults.number) {
				this.slideNub.innerHTML = ((b.getNow(e, l) + 1) % this.defaults.total == 0 ? this.total : (b.getNow(e, l) + 1) % this.defaults.total)
			}
			c[b.getNow(e, l)].addEventListener("webkitTransitionEnd", n, false);
			c[b.getNow(e, l)].addEventListener("transitionend", n, false);

			function n() {
				if (q.defaults.location) {
					if (f < -(l - 1) * s - s / 5) {
						if (q.defaults.lastImgSlider && typeof q.defaults.lastImgSlider == "function") {
							q.defaults.laseMoveFn(0);
							q.defaults.lastImgSlider()
						}
					}
				}
				c[b.getNow(q.now, l)].removeEventListener("webkitTransitionEnd", n, false);
				c[b.getNow(q.now, l)].removeEventListener("transitionend", n, false)
			}
		},
		play: function() {
			var c = this;
			c.timer = setInterval(function() {
				c.now++;
				c.tab(null, "++", true)
			}, this.defaults.playTime)
		},
		pause: function() {
			var c = this;
			clearInterval(c.timer)
		},
		orientationchangeHandler: function() {
			var c = this;
			setTimeout(function() {
				c.liInit()
			}, 300)
		},
		addSmallBtn: function() {
			var e = "",
				f = this.aLi;
			for (var c = 0; c < f.length; c++) {
				if (c == this.defaults.startIndex) {
					e += '<span class="active" data-ol-btn="btn"></span>'
				} else {
					e += '<span data-ol-btn="btn"></span>'
				}
			}
			return e
		},
		show: function() {
			this.oBox.style.display = "inline-block"
		},
		hide: function() {
			this.oBox.style.display = "none"
		}
	};
	b.extend = function(e, c) {
		for (name in c) {
			if (c[name] !== undefined) {
				e[name] = c[name]
			}
		}
	};
	b.extend(b, {
		setStyle: function(e, c) {
			for (name in c) {
				e.style[name] = c[name]
			}
		},
		getTranX: function(f) {
			var e = f.style.WebkitTransform || f.style.transform;
			var g = e.indexOf("translate3d(");
			var c = parseInt(e.substring(g + 12, e.length - 13));
			return c
		},
		_device: function() {
			var g = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
			var e = "touchstart";
			var f = "touchmove";
			var c = "touchend";
			return {
				hasTouch: g,
				startEvt: e,
				moveEvt: f,
				endEvt: c
			}
		},
		getNow: function(e, c) {
			return e % c
		},
		getPre: function(f, c) {
			if (f % c - 1 < 0) {
				var e = c - 1
			} else {
				var e = f % c - 1
			}
			return e
		},
		getNext: function(f, e) {
			var c = (f + 1) % e;
			return c
		},
		getNextNew: function(f, e) {
			var c = (f + 2) % e;
			return c
		},
		move: function(h, e, g, c) {
			var i = g || null;
			if (i) {
				h.style.zIndex = i
			}
			b.setStyle(h, {
				WebkitTransform: "translate3d(" + e + "px, 0px, 0px)",
				transform: "translate3d(" + e + "px, 0px, 0px)"
			});
			if (!c) {
				var f = parseFloat(e) / 100;
				if (f > 0.8) {
					f = 0.8
				} else {
					if (-0.8 < f < 0) {
						f = (-f)
					} else {
						if (f <= -0.8) {
							f = 0.8
						}
					}
				}
				b.setStyle(h, {
					padding: f + "%"
				})
			}
		},
		stopDefault: function(c) {
			if (c && c.preventDefault) {
				c.preventDefault()
			} else {
				window.event.returnValue = false
			}
			return false
		},
		stopPropagation: function(c) {
			if (c && c.stopPropagation) {
				c.stopPropagation()
			} else {
				c.cancelBubble = true
			}
		}
	});
	return a
})();