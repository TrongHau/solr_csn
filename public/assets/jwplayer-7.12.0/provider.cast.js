webpackJsonpjwplayer([4], {
    8: function(e, t, a) {
        var i, n;
        i = [a(1), a(11), a(2), a(13), a(12)], n = function(e, t, a, i, n) {
            function r(t) {
                if (this._currentTextTrackIndex = -1, t) {
                    if (this._textTracks ? (this._textTracks = e.reject(this._textTracks, function(e) {
                        if (this.renderNatively && "nativecaptions" === e._id) return delete this._tracksById[e._id], !0
                    }, this), delete this._tracksById.nativemetadata) : this._initTextTracks(), t.length) {
                        var i = 0,
                            r = t.length;
                        for (i; i < r; i++) {
                            var s = t[i];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind, !s.label && "captions" === s.kind) {
                                        var c = n.createLabel(s, this._unknownCount);
                                        s.name = c.label, this._unknownCount = c.unknownCount
                                    }
                                } else s._id = n.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id])
                                if ("metadata" === s.kind) s.mode = "hidden", s.oncuechange = L.bind(this), this._tracksById[s._id] = s;
                                else if (C(s.kind)) {
                                    var d, o = s.mode;
                                    if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                    if (s.mode = o, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                        for (var u = this._cuesByTrackId[s._id].cues; d = u.shift();) x(this.renderNatively, s, d);
                                        s.mode = o, this._cuesByTrackId[s._id].loaded = !0
                                    }
                                    b.call(this, s)
                                }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || g.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (a.isEdge() || a.isFF() || a.isSafari()) && (this.addTrackHandler = this.addTrackHandler || p.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))), this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function s(e) {
                if (this.renderNatively) {
                    var t = e === this._itemTracks;
                    t || i.cancelXhr(this._itemTracks), this._itemTracks = e, e && (t || (this.disableTextTrack(), w.call(this), this.addTextTracks(e)))
                }
            }

            function c() {
                return this._currentTextTrackIndex
            }

            function d(t) {
                return this.renderNatively ? void(this._textTracks && (0 === t && e.each(this._textTracks, function(e) {
                    e.mode = e.embedded ? "hidden" : "disabled"
                }), this._currentTextTrackIndex !== t - 1 && (this.disableTextTrack(), this._currentTextTrackIndex = t - 1, this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing"), this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                })))) : void(this.setCurrentSubtitleTrack && this.setCurrentSubtitleTrack(t - 1))
            }

            function o(e) {
                if (e.text && e.begin && e.end) {
                    var t = e.trackid.toString(),
                        a = this._tracksById && this._tracksById[t];
                    a || (a = {
                        kind: "captions",
                        _id: t,
                        data: []
                    }, this.addTextTracks([a]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var n;
                    e.useDTS && (a.source || (a.source = e.source || "mpegts")), n = e.begin + "_" + e.text;
                    var r = this._metaCuesByTextTime[n];
                    if (!r) {
                        r = {
                            begin: e.begin,
                            end: e.end,
                            text: e.text
                        }, this._metaCuesByTextTime[n] = r;
                        var s = i.convertToVTTCues([r])[0];
                        a.data.push(s)
                    }
                }
            }

            function u(e) {
                this._tracksById || this._initTextTracks();
                var t = e.track ? e.track : "native" + e.type,
                    a = this._tracksById[t],
                    i = "captions" === e.type ? "Unknown CC" : "ID3 Metadata",
                    n = e.cue;
                if (!a) {
                    var r = {
                        kind: e.type,
                        _id: t,
                        label: i,
                        embedded: !0
                    };
                    a = E.call(this, r), this.renderNatively || "metadata" === a.kind ? this.setTextTracks(this.video.textTracks) : _.call(this, [a])
                }
                A.call(this, a, n) && (this.renderNatively || "metadata" === a.kind ? x(this.renderNatively, a, n) : a.data.push(n))
            }

            function l(e) {
                var t = this._tracksById[e.name];
                if (t) {
                    t.source = e.source;
                    for (var a = e.captions || [], n = [], r = !1, s = 0; s < a.length; s++) {
                        var c = a[s],
                            d = e.name + "_" + c.begin + "_" + c.end;
                        this._metaCuesByTextTime[d] || (this._metaCuesByTextTime[d] = c, n.push(c), r = !0)
                    }
                    r && n.sort(function(e, t) {
                        return e.begin - t.begin
                    });
                    var o = i.convertToVTTCues(n);
                    Array.prototype.push.apply(t.data, o)
                }
            }

            function T(e, t, a) {
                e && (f(e, t, a), this.instreamMode || (e.addEventListener ? e.addEventListener(t, a) : e["on" + t] = a))
            }

            function f(e, t, a) {
                e && (e.removeEventListener ? e.removeEventListener(t, a) : e["on" + t] = null)
            }

            function h() {
                i.cancelXhr(this._itemTracks);
                var e = this._tracksById && this._tracksById.nativemetadata;
                (this.renderNatively || e) && (I(this.renderNatively, this.video.textTracks), e && (e.oncuechange = null)), this._itemTracks = null, this._textTracks = null, this._tracksById = null, this._cuesByTrackId = null, this._metaCuesByTextTime = null, this._unknownCount = 0, this._activeCuePosition = null, this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), I(this.renderNatively, this.video.textTracks))
            }

            function v(e) {
                this._cachedVTTCues[e] && (this._cachedVTTCues[e] = {}, this._tracksById[e].data = [])
            }

            function m() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "disabled", (e.embedded || "nativecaptions" === e._id) && (e.mode = "hidden"))
                }
            }

            function k() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "showing")
                }
            }

            function g() {
                var t = this.video.textTracks,
                    a = e.filter(t, function(e) {
                        return (e.inuse || !e._id) && C(e.kind)
                    });
                if (!this._textTracks || M.call(this, a)) return void this.setTextTracks(t);
                for (var i = -1, n = 0; n < this._textTracks.length; n++)
                    if ("showing" === this._textTracks[n].mode) {
                        i = n;
                        break
                    }
                i !== this._currentTextTrackIndex && this.setSubtitlesTrack(i + 1)
            }

            function p() {
                this.setTextTracks(this.video.textTracks)
            }

            function _(e) {
                if (e) {
                    this._textTracks || this._initTextTracks();
                    for (var t = 0; t < e.length; t++) {
                        var a = e[t];
                        if (!a.kind || C(a.kind)) {
                            var n = E.call(this, a);
                            b.call(this, n), a.file && (a.data = [], i.loadFile(a, this.addVTTCuesToTrack.bind(this, n), R))
                        }
                    }
                    this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function y(e, t) {
                if (this.renderNatively) {
                    var a = this._tracksById[e._id];
                    if (!a) return this._cuesByTrackId || (this._cuesByTrackId = {}), void(this._cuesByTrackId[e._id] = {
                        cues: t,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[e._id] || !this._cuesByTrackId[e._id].loaded) {
                        var i;
                        for (this._cuesByTrackId[e._id] = {
                            cues: t,
                            loaded: !0
                        }; i = t.shift();) x(this.renderNatively, a, i)
                    }
                }
            }

            function x(e, t, i) {
                if (!a.isIE() || !e || !window.TextTrackCue) return void t.addCue(i);
                var n = new window.TextTrackCue(i.startTime, i.endTime, i.text);
                t.addCue(n)
            }

            function I(t, i) {
                i && i.length && e.each(i, function(e) {
                    if (!(a.isIE() && t && /^(native|subtitle|cc)/.test(e._id))) {
                        e.mode = "disabled", e.mode = "hidden";
                        for (var i = e.cues.length; i--;) e.removeCue(e.cues[i]);
                        e.embedded || (e.mode = "disabled"), e.inuse = !1
                    }
                })
            }

            function C(e) {
                return "subtitles" === e || "captions" === e
            }

            function S() {
                this._textTracks = [], this._tracksById = {}, this._metaCuesByTextTime = {}, this._cuesByTrackId = {}, this._cachedVTTCues = {}, this._unknownCount = 0
            }

            function E(t) {
                var a, i = n.createLabel(t, this._unknownCount),
                    r = i.label;
                if (this._unknownCount = i.unknownCount, this.renderNatively || "metadata" === t.kind) {
                    var s = this.video.textTracks;
                    a = e.findWhere(s, {
                        label: r
                    }), a ? (a.kind = t.kind, a.language = t.language || "") : a = this.video.addTextTrack(t.kind, r, t.language || ""), a["default"] = t["default"], a.mode = "disabled", a.inuse = !0
                } else a = t, a.data = a.data || [];
                return a._id || (a._id = n.createId(t, this._textTracks.length)), a
            }

            function b(e) {
                this._textTracks.push(e), this._tracksById[e._id] = e
            }

            function w() {
                if (this._textTracks) {
                    var t = e.filter(this._textTracks, function(e) {
                        return e.embedded || "subs" === e.groupid
                    });
                    this._initTextTracks(), e.each(t, function(e) {
                        this._tracksById[e._id] = e
                    }), this._textTracks = t
                }
            }

            function L(a) {
                var i = a.currentTarget.activeCues;
                if (i && i.length) {
                    var n = i[i.length - 1].startTime;
                    if (this._activeCuePosition !== n) {
                        var r = [];
                        if (e.each(i, function(e) {
                            e.startTime < n || (e.data || e.value ? r.push(e) : e.text && this.trigger("meta", {
                                metadataTime: n,
                                metadata: JSON.parse(e.text)
                            }))
                        }, this), r.length) {
                            var s = t.parseID3(r);
                            this.trigger("meta", {
                                metadataTime: n,
                                metadata: s
                            })
                        }
                        this._activeCuePosition = n
                    }
                }
            }

            function A(e, t) {
                var a = e.kind;
                this._cachedVTTCues[e._id] || (this._cachedVTTCues[e._id] = {});
                var i, n = this._cachedVTTCues[e._id];
                switch (a) {
                    case "captions":
                    case "subtitles":
                        i = Math.floor(20 * t.startTime);
                        var r = "_" + t.line,
                            s = Math.floor(20 * t.endTime),
                            c = n[i + r] || n[i + 1 + r] || n[i - 1 + r];
                        return !(c && Math.abs(c - s) <= 1) && (n[i + r] = s, !0);
                    case "metadata":
                        var d = t.data ? new Uint8Array(t.data).join("") : t.text;
                        return i = t.startTime + d, !n[i] && (n[i] = t.endTime, !0);
                    default:
                        return !1
                }
            }

            function M(e) {
                if (e.length > this._textTracks.length) return !0;
                for (var t = 0; t < e.length; t++) {
                    var a = e[t];
                    if (!a._id || !this._tracksById[a._id]) return !0
                }
                return !1
            }

            function R(e) {
                a.log("CAPTIONS(" + e + ")")
            }
            var B = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: S,
                addTracksListener: T,
                clearTracks: h,
                clearCueData: v,
                disableTextTrack: m,
                enableTextTrack: k,
                getSubtitlesTrack: c,
                removeTracksListener: f,
                addTextTracks: _,
                setTextTracks: r,
                setupSideloadedTracks: s,
                setSubtitlesTrack: d,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: l,
                addCaptionsCue: o,
                addVTTCue: u,
                addVTTCuesToTrack: y,
                renderNatively: !1
            };
            return B
        }.apply(t, i), !(void 0 !== n && (e.exports = n))
    },
    75: function(e, t, a) {
        var i, n;
        i = [a(81), a(159), a(158), a(157), a(4), a(5), a(2), a(1)], n = function(e, t, a, i, n, r, s, c) {
            var d = i.loadApi(),
                o = {};
            return function(e, i) {
                function u() {
                    var e = i.get("cast") || {};
                    i.set("castState", {
                        available: !1,
                        active: !1,
                        deviceName: ""
                    }), E && (E.off(), E.reset()), E = new t(e.customAppId), E.on("castState", I), E.on("mediaUpdate", _), E.on("mediaUpdate", y), E.on("setPlaylist", h), E.updateCastState(), o[i.get("id")] = E;
                    var n = i.chooseProvider;
                    i.chooseProvider = function(e) {
                        return i.get("castActive") ? a : n(e)
                    }
                }

                function l() {}

                function T() {
                    return i.getVideo()
                }

                function f() {
                    i.changeVideoProvider(a), S = T(), S.setService(E)
                }

                function h() {
                    E.setPlaylist(i), i.set("state", r.BUFFERING);
                    var e = i.get("playlistItem");
                    S.updateScreen("Connecting", e.image)
                }

                function v() {
                    var t, a = i.get("castClicked") && !E.getPlayerId();
                    a && E.setPlayerId(i.get("id")), C() && (e.setFullscreen(!1), f(), E.addListeners(), t = E.getMedia(), t ? E.loaded(t) : h(), i.on("change:playlist", h), i.on("itemReady", g), i.change("captions", p))
                }

                function m() {
                    var t = i.get("state"),
                        a = t === r.COMPLETE,
                        s = t === r.IDLE,
                        d = t === r.ERROR,
                        o = i.get("item"),
                        u = i.get("playlist"),
                        l = i.get("playlistItem");
                    E.removeListeners(), S && S.remove(), l && d ? (l = u[o + 1], void 0 === l ? a = !0 : (i.set("item", o + 1), i.set("playlistItem", l))) : l && !a && (l = c.extend({}, l), l.starttime = l.start = i.get("position") || 0), i.set("castActive", !1), i.set("castClicked", !1), i.resetProvider(), i.setProvider(l), i.off("change:playlist", h), i.off("itemReady", g), l && (a ? (i.stopVideo(), e.trigger(n.JWPLAYER_PLAYLIST_COMPLETE, {})) : s || i.loadVideo(l))
                }

                function k(e) {
                    e ? v() : S && m()
                }

                function g() {
                    E.extractEmbeddedCaptions()
                }

                function p(e, t) {
                    var a = E.getMedia();
                    if (a) {
                        var i = E.obtainTrackStyles(t);
                        E.editTracksInfo(a.activeTrackIds, i)
                    }
                }

                function _(e) {
                    var t = e.field,
                        a = e.value;
                    if (S) {
                        "media" === t && x(a);
                        var i = S.castEventHandlers[t];
                        i && i(a)
                    }
                }

                function y(e) {
                    "media" === e.field && (g(), S.setSubtitlesTrack(i.get("captionsIndex")), E.off("mediaUpdate", y))
                }

                function x(e) {
                    var t, a = i.get("playlist");
                    if (e.media) {
                        t = e.media.metadata;
                        var n = a[t.index];
                        c.isNumber(t.index) && t.index !== i.get("item") && (i.set("item", t.index), i.set("playlistItem", n), i.trigger("itemReady", n), S.setSubtitlesTrack(i.get("captionsIndex")));
                        var r = i.get("castState").deviceName,
                            s = r ? "Casting to " + r : "";
                        S.updateScreen(s, n.image)
                    }
                }

                function I(e) {
                    var t = i.get("castActive"),
                        a = e.active;
                    t !== a && k(a), a = a && C(), i.set("castAvailable", e.available), i.set("castActive", a), i.set("castState", {
                        available: e.available,
                        active: a,
                        deviceName: e.deviceName
                    })
                }

                function C() {
                    return E.getPlayerId() === i.get("id")
                }
                var S = null,
                    E = o[i.get("id")];
                d.then(u)["catch"](l), this.castToggle = s.noop
            }
        }.apply(t, i), !(void 0 !== n && (e.exports = n))
    },
    157: function(e, t, a) {
        var i, n;
        i = [a(4), a(15), a(3), a(1)], n = function(e, t, a, i) {
            function n() {
                return s ? c : c = new Promise(function(a, i) {
                    var n = "__onGCastApiAvailable";
                    s = new t(d), s.addEventListener(e.ERROR, r), s.load(), window[n] = function(e) {
                        e ? a(e) : i()
                    }
                })
            }

            function r() {
                s.resetEventListeners(), s = null
            }
            var s, c, d = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1",
                o = i.extend({
                    loadApi: n
                }, a);
            return o
        }.apply(t, i), !(void 0 !== n && (e.exports = n))
    },
    158: function(e, t, a) {
        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var n, r, s = a(177),
            c = i(s);
        n = [a(2), a(4), a(3), a(5), a(10), a(8), a(1)], r = function(e, t, a, i, n, r, s) {
            function d(t, a) {
                var i = e.createElement((0, c["default"])(t));
                return a && (i.style.backgroundImage = 'url("' + a + '")'), i
            }
            var o = function() {
                function c() {
                    var e = 0,
                        t = u.getMedia();
                    if (!t) return e;
                    var a = t.media.tracks;
                    if (!a) return e;
                    for (var i = 0; i < a.length; i++) {
                        var n = a[i];
                        if ("TEXT" === n.type) {
                            e = i;
                            break
                        }
                    }
                    return e
                }
                var o, u, l = this;
                s.extend(l, a, r), l.setState = function(e) {
                    return n.setState.call(this, e)
                }, l.destroy = function() {
                    clearInterval(l.timeInterval)
                }, l.supportsFullscreen = function() {
                    return !1
                }, l.setService = function(e) {
                    u = e, l._castingScreen = l.updateScreen()
                }, l.setup = function(e) {
                    l.setState(i.BUFFERING), l.sendCommand("setup", e)
                }, l.init = function(e) {
                    l.sendCommand("item", e)
                }, l.load = function(e) {
                    l.init(e), l.play()
                }, l.play = function() {
                    l.sendCommand("play")
                }, l.pause = function() {
                    l.sendCommand("pause")
                }, l.seek = function(e) {
                    l.trigger(t.JWPLAYER_MEDIA_SEEK, {
                        position: l.getRemote("currentTime"),
                        offset: e
                    }), l.sendCommand("seek", e, function() {
                        l.trigger(t.JWPLAYER_MEDIA_SEEKED)
                    })
                }, l.next = function(e) {
                    l.sendCommand("next", e)
                }, l.volume = function(e) {
                    l.sendCommand("volume", e)
                }, l.mute = function(e) {
                    l.sendCommand("mute", e)
                }, l.setSubtitlesTrack = function(e) {
                    var t = e > 0 ? [e + c()] : [];
                    u.editTracksInfo(t)
                }, l.sendCommand = function(e) {
                    if (u) {
                        var t = Array.prototype.slice.call(arguments, 1);
                        u[e] && u[e].apply(u, t)
                    }
                }, l.getRemote = function(e) {
                    if (u) {
                        var t = u.getMedia();
                        return t ? "currentTime" === e ? t.getEstimatedTime() : t[e] || t.media && t.media[e] : null
                    }
                }, l.updateScreen = function(e, t) {
                    o.innerHTML = d(e, t).outerHTML
                }, l.setContainer = function(e) {
                    o = e, l._castingScreen && e.appendChild(l._castingScreen)
                }, l.getContainer = function() {
                    return o
                }, l.remove = function() {
                    clearInterval(l.timeInterval), l._castingScreen && o === l._castingScreen.parentNode && o.removeChild(l._castingScreen), l._castingScreen = null
                }, l.getDuration = function() {
                    return l.getRemote("duration") || 1 / 0
                }, l.stop = function() {
                    l.clearTracks()
                }, l.setControls = e.noop, l.setCurrentQuality = e.noop, l.resize = e.noop, l.seekDrag = e.noop, l.setVisibility = e.noop, l.setFullScreen = s.constant(!1), l.getFullScreen = s.constant(!1), l.setPlaybackRate = s.constant(!1), l.getPlaybackRate = s.constant(!1), l.checkComplete = s.constant(!1), l.getCurrentQuality = s.constant(0), l.getQualityLevels = s.constant(["Auto"]), l.castEventHandlers = {
                    media: function(e) {
                        var t = l.getRemote("items"),
                            a = "IDLE" === e.playerState && "FINISHED" === e.idleReason,
                            i = "IDLE" === e.playerState && "ERROR" === e.idleReason,
                            n = a && !t;
                        l.castEventHandlers.playerState(n ? "complete" : e.playerState), l.castEventHandlers.currentTime(), clearInterval(l.timeInterval), "PLAYING" === e.playerState ? l.timeInterval = setInterval(l.castEventHandlers.currentTime, 100) : n ? (l.setState("complete"), u.disconnect()) : i && (l.setState("error"), u.disconnect())
                    },
                    volume: function(e) {
                        l.trigger("volume", {
                            volume: Math.round(100 * e.volume)
                        }), l.trigger("mute", {
                            mute: e.isMute
                        })
                    },
                    captions: function(e) {
                        l.clearTracks(), l.setTextTracks(e.tracks)
                    },
                    playerState: function(e) {
                        if (e && i[e.toUpperCase()]) {
                            var a = e.toLowerCase();
                            a !== i.IDLE && a !== i.BUFFERING || l.trigger(t.JWPLAYER_MEDIA_BUFFER, {
                                bufferPercent: 0,
                                position: l.getRemote("currentTime"),
                                duration: l.getDuration()
                            }), l.setState(a)
                        }
                    },
                    currentTime: function() {
                        l.trigger(t.JWPLAYER_MEDIA_TIME, {
                            position: l.getRemote("currentTime"),
                            duration: l.getDuration()
                        })
                    },
                    duration: function() {
                        l.trigger(t.JWPLAYER_MEDIA_TIME, {
                            position: l.getRemote("currentTime"),
                            duration: l.getDuration()
                        })
                    },
                    isPaused: function(e) {
                        e ? l.setState(i.PAUSED) : l.setState(i.PLAYING)
                    }
                }
            };
            return o.prototype = {
                getName: function() {
                    return {
                        name: "chromecast"
                    }
                }
            }, o
        }.apply(t, n), !(void 0 !== r && (e.exports = r))
    },
    159: function(e, t, a) {
        var i, n;
        i = [a(3), a(2), a(1)], n = function(e, t, a) {
            return function(t) {
                function i(e, t, i) {
                    var s = function(e) {
                            var t = !a.size(e.mediaTypes) || !a.contains(e.mediaTypes, 'video/webm; codecs="vp9"'),
                                i = !a.size(e.drm) || a.any(e.drm, function(e, t) {
                                    return "fairplay" !== t
                                });
                            return t && i
                        },
                        c = function(e) {
                            return e.map(function(e, t) {
                                var a = t + 1,
                                    i = o.cast.media,
                                    n = new i.Track(a, i.TrackType.TEXT);
                                return n.trackContentId = e.file, n.trackContentType = "text/vtt", n.subtype = i.TextTrackType.SUBTITLES, n.name = e.label || a, n.language = "en-US", n.customData = "side-loaded captions", n
                            })
                        },
                        u = e.allSources.slice(0).sort(function(e, t) {
                            return !e["default"] && t["default"] ? 1 : 0
                        }),
                        T = a.find(u, s);
                    if (T) {
                        var f = r(T.type),
                            h = n(T.file),
                            v = e.image ? n(e.image) : null,
                            m = T.drm,
                            k = new l.MediaInfo(h, f);
                        return k.metadata = new l.GenericMediaMetadata, k.metadata.title = e.title, k.metadata.subtitle = e.description, k.metadata.index = t || 0, k.metadata.playerId = d.getPlayerId(), e.tracks && e.tracks.length && (k.tracks = c(e.tracks)), i && (k.textTrackStyle = d.obtainTrackStyles(i)), v && (k.metadata.images = [{
                            url: v
                        }]), m && (k.customData = {
                            drm: m
                        }), k
                    }
                }

                function n(e) {
                    var t = document.createElement("a");
                    return t.href = e, t.href
                }

                function r(e) {
                    switch (e) {
                        case "mp4":
                        case "webm":
                            return "video/" + e;
                        case "mpd":
                        case "dash":
                            return "application/dash+xml";
                        case "m3u8":
                        case "hls":
                            return "application/x-mpegURL";
                        case "aac":
                            return "audio/x-aac";
                        case "mp3":
                            return "audio/mpeg";
                        default:
                            return e
                    }
                }

                function s() {
                    var e = f.getCastState() !== T.NO_DEVICES_AVAILABLE,
                        t = "";
                    h = f.getCurrentSession(), h && (t = h.getCastDevice().friendlyName || t), d.trigger("castState", {
                        available: e,
                        active: !!h,
                        deviceName: t
                    })
                }

                function c() {
                    var e = d.getMedia();
                    e && d.trigger("mediaUpdate", {
                        field: "media",
                        value: e
                    })
                }
                var d = this,
                    o = window.chrome,
                    u = o.cast,
                    l = u.media,
                    T = window.cast.framework,
                    f = T.CastContext.getInstance(),
                    h = null,
                    v = T.CastContextEventType.CAST_STATE_CHANGED,
                    m = t || l.DEFAULT_MEDIA_RECEIVER_APP_ID;
                a.extend(d, e), f.removeEventListener(v, s), f.addEventListener(v, s), f.setOptions({
                    receiverApplicationId: m,
                    autoJoinPolicy: u.AutoJoinPolicy.ORIGIN_SCOPED
                }), d.updateCastState = s, d.setPlaylist = function(e) {
                    var t, n, r, s = e.get("playlist"),
                        c = e.get("item"),
                        u = e.get("position"),
                        T = e.get("repeat"),
                        f = e.get("captions");
                    "complete" === e.get("state") && (c = 0, u = 0), n = a.reduce(s, function(e, t, a) {
                        var n, r = i(t, a, f);
                        return r && (n = new l.QueueItem(r), r.metadata.index === c && (n.startTime = u), e.push(n)), e
                    }, []), t = new l.QueueLoadRequest(n), t.startIndex = c, T && (t.repeatMode = o.cast.media.RepeatMode.ALL), r = h.getSessionObj(), r.queueLoad(t, d.loaded, d.error)
                }, d.getPlayerId = function() {
                    var e, t, a = d.getMedia();
                    return a && a.media ? (e = a.media.metadata, e.playerId) : h ? (t = h.getSessionObj(), t.playerId) : null
                }, d.setPlayerId = function(e) {
                    var t;
                    h && (t = h.getSessionObj(), t.playerId = e)
                }, d.loaded = function(e) {
                    if (d.trigger("mediaUpdate", {
                        field: "volume",
                        value: {
                            volume: h.getVolume(),
                            isMute: h.isMute()
                        }
                    }), h) {
                        var t = h.getSessionObj();
                        t.addMediaListener(function(e) {
                            e.addUpdateListener(c)
                        })
                    }
                    e.addUpdateListener(c)
                }, d.addListeners = function() {
                    var e;
                    return h ? (e = h.getSessionObj(), e.addUpdateListener(s), void h.addEventListener(T.SessionEventType.VOLUME_CHANGED, function(e) {
                        d.trigger("mediaUpdate", {
                            field: "volume",
                            value: e
                        })
                    })) : null
                }, d.reset = function() {
                    d.removeListeners(), f && f.removeEventListener(v, s)
                }, d.removeListeners = function() {
                    var e;
                    return h ? (e = h.getSessionObj(), e.removeUpdateListener(s), e.media.forEach(function(e) {
                        e.removeUpdateListener(c)
                    }), void h.removeEventListener(T.SessionEventType.VOLUME_CHANGED)) : null
                }, d.getMedia = function() {
                    if (h) {
                        var e = h.getSessionObj(),
                            t = e.media;
                        if (t && t.length) return t[0]
                    }
                    return null
                }, d.error = function(e) {
                    console.error("Error:", e), d.disconnect()
                }, d.item = function(e) {
                    var t = d.getMedia();
                    if (!t) return void d.trigger("setPlaylist");
                    var n = i(e),
                        r = a.find(t.items, function(e) {
                            return e.media.contentId === n.contentId && e.media.index === n.index
                        });
                    r ? t.queueJumpToItem(r.itemId) : d.trigger("setPlaylist")
                }, d.play = function() {
                    var e = d.getMedia();
                    e && d.getMedia().play()
                }, d.pause = function() {
                    d.getMedia().pause()
                }, d.next = function() {
                    d.getMedia().queueNext()
                }, d.disconnect = function() {
                    h.endSession(!0)
                }, d.seek = function(e, t) {
                    var a = new l.SeekRequest;
                    a.currentTime = e, a.resumeState = l.ResumeState.PLAYBACK_START, d.getMedia().seek(a, t)
                }, d.mute = function(e) {
                    h.setMute(e)
                }, d.volume = function(e) {
                    h.setVolume(e / 100)
                }, d.editTracksInfo = function(e, t) {
                    var a = d.getMedia();
                    if (a) {
                        var i = new o.cast.media.EditTracksInfoRequest(e, t);
                        a.editTracksInfo(i)
                    }
                }, d.extractEmbeddedCaptions = function() {
                    var e = d.getMedia();
                    if (e && e.media.tracks) {
                        var t = e.media.tracks.filter(function(e) {
                            return "TEXT" === e.type && "side-loaded captions" !== e.customData
                        }).map(function(e, t) {
                            return e.mapId = t, e.kind = "subtitles", e.cues = [], e
                        });
                        t.length && d.trigger("mediaUpdate", {
                            field: "captions",
                            value: {
                                tracks: t
                            }
                        })
                    }
                }, d.obtainTrackStyles = function(e) {
                    var t = function(e) {
                            var t = o.cast.media.TextTrackEdgeType;
                            switch (e) {
                                case "dropshadow":
                                    return t.DROP_SHADOW;
                                case "raised":
                                    return t.RAISED;
                                case "depressed":
                                    return t.DEPRESSED;
                                case "uniform":
                                    return t.OUTLINE;
                                default:
                                    return t.NONE
                            }
                        },
                        a = function(e) {
                            var t = Math.round(e / 100 * 255);
                            return t.toString(16)
                        },
                        i = o.cast.media,
                        n = new i.TextTrackStyle;
                    return n.foregroundColor = e.color + a(e.fontOpacity), n.backgroundColor = e.backgroundColor + a(e.backgroundOpacity), n.windowColor = e.windowColor + a(e.windowOpacity), n.fontFamily = e.fontFamily, n.fontStyle = i.TextTrackFontStyle.NORMAL, n.fontScale = e.fontSize / 14, n.edgeType = t(e.edgeStyle), n.windowType = i.TextTrackWindowType.NORMAL, n
                }
            }
        }.apply(t, i), !(void 0 !== n && (e.exports = n))
    },
    177: function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return '<div class="jw-cast jw-reset jw-preview"><div class="jw-cast-container"><div class="jw-cast-text jw-reset">' + e + "</div></div></div>"
        }
    }
});