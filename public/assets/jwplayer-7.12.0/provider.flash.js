webpackJsonpjwplayer([6], {
    8: function(t, e, i) {
        var n, a;
        n = [i(1), i(11), i(2), i(13), i(12)], a = function(t, e, i, n, a) {
            function r(e) {
                if (this._currentTextTrackIndex = -1, e) {
                    if (this._textTracks ? (this._textTracks = t.reject(this._textTracks, function(t) {
                        if (this.renderNatively && "nativecaptions" === t._id) return delete this._tracksById[t._id], !0
                    }, this), delete this._tracksById.nativemetadata) : this._initTextTracks(), e.length) {
                        var n = 0,
                            r = e.length;
                        for (n; n < r; n++) {
                            var s = e[n];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind, !s.label && "captions" === s.kind) {
                                        var c = a.createLabel(s, this._unknownCount);
                                        s.name = c.label, this._unknownCount = c.unknownCount
                                    }
                                } else s._id = a.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id])
                                if ("metadata" === s.kind) s.mode = "hidden", s.oncuechange = B.bind(this), this._tracksById[s._id] = s;
                                else if (p(s.kind)) {
                                    var u, d = s.mode;
                                    if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                    if (s.mode = d, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                        for (var o = this._cuesByTrackId[s._id].cues; u = o.shift();) C(this.renderNatively, s, u);
                                        s.mode = d, this._cuesByTrackId[s._id].loaded = !0
                                    }
                                    A.call(this, s)
                                }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || g.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (i.isEdge() || i.isFF() || i.isSafari()) && (this.addTrackHandler = this.addTrackHandler || m.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))), this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function s(t) {
                if (this.renderNatively) {
                    var e = t === this._itemTracks;
                    e || n.cancelXhr(this._itemTracks), this._itemTracks = t, t && (e || (this.disableTextTrack(), L.call(this), this.addTextTracks(t)))
                }
            }

            function c() {
                return this._currentTextTrackIndex
            }

            function u(e) {
                return this.renderNatively ? void(this._textTracks && (0 === e && t.each(this._textTracks, function(t) {
                    t.mode = t.embedded ? "hidden" : "disabled"
                }), this._currentTextTrackIndex !== e - 1 && (this.disableTextTrack(), this._currentTextTrackIndex = e - 1, this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing"), this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                })))) : void(this.setCurrentSubtitleTrack && this.setCurrentSubtitleTrack(e - 1))
            }

            function d(t) {
                if (t.text && t.begin && t.end) {
                    var e = t.trackid.toString(),
                        i = this._tracksById && this._tracksById[e];
                    i || (i = {
                        kind: "captions",
                        _id: e,
                        data: []
                    }, this.addTextTracks([i]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var a;
                    t.useDTS && (i.source || (i.source = t.source || "mpegts")), a = t.begin + "_" + t.text;
                    var r = this._metaCuesByTextTime[a];
                    if (!r) {
                        r = {
                            begin: t.begin,
                            end: t.end,
                            text: t.text
                        }, this._metaCuesByTextTime[a] = r;
                        var s = n.convertToVTTCues([r])[0];
                        i.data.push(s)
                    }
                }
            }

            function o(t) {
                this._tracksById || this._initTextTracks();
                var e = t.track ? t.track : "native" + t.type,
                    i = this._tracksById[e],
                    n = "captions" === t.type ? "Unknown CC" : "ID3 Metadata",
                    a = t.cue;
                if (!i) {
                    var r = {
                        kind: t.type,
                        _id: e,
                        label: n,
                        embedded: !0
                    };
                    i = I.call(this, r), this.renderNatively || "metadata" === i.kind ? this.setTextTracks(this.video.textTracks) : x.call(this, [i])
                }
                R.call(this, i, a) && (this.renderNatively || "metadata" === i.kind ? C(this.renderNatively, i, a) : i.data.push(a))
            }

            function h(t) {
                var e = this._tracksById[t.name];
                if (e) {
                    e.source = t.source;
                    for (var i = t.captions || [], a = [], r = !1, s = 0; s < i.length; s++) {
                        var c = i[s],
                            u = t.name + "_" + c.begin + "_" + c.end;
                        this._metaCuesByTextTime[u] || (this._metaCuesByTextTime[u] = c, a.push(c), r = !0)
                    }
                    r && a.sort(function(t, e) {
                        return t.begin - e.begin
                    });
                    var d = n.convertToVTTCues(a);
                    Array.prototype.push.apply(e.data, d)
                }
            }

            function l(t, e, i) {
                t && (T(t, e, i), this.instreamMode || (t.addEventListener ? t.addEventListener(e, i) : t["on" + e] = i))
            }

            function T(t, e, i) {
                t && (t.removeEventListener ? t.removeEventListener(e, i) : t["on" + e] = null)
            }

            function _() {
                n.cancelXhr(this._itemTracks);
                var t = this._tracksById && this._tracksById.nativemetadata;
                (this.renderNatively || t) && (E(this.renderNatively, this.video.textTracks), t && (t.oncuechange = null)), this._itemTracks = null, this._textTracks = null, this._tracksById = null, this._cuesByTrackId = null, this._metaCuesByTextTime = null, this._unknownCount = 0, this._activeCuePosition = null, this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), E(this.renderNatively, this.video.textTracks))
            }

            function k(t) {
                this._cachedVTTCues[t] && (this._cachedVTTCues[t] = {}, this._tracksById[t].data = [])
            }

            function f() {
                if (this._textTracks) {
                    var t = this._textTracks[this._currentTextTrackIndex];
                    t && (t.mode = "disabled", (t.embedded || "nativecaptions" === t._id) && (t.mode = "hidden"))
                }
            }

            function v() {
                if (this._textTracks) {
                    var t = this._textTracks[this._currentTextTrackIndex];
                    t && (t.mode = "showing")
                }
            }

            function g() {
                var e = this.video.textTracks,
                    i = t.filter(e, function(t) {
                        return (t.inuse || !t._id) && p(t.kind)
                    });
                if (!this._textTracks || w.call(this, i)) return void this.setTextTracks(e);
                for (var n = -1, a = 0; a < this._textTracks.length; a++)
                    if ("showing" === this._textTracks[a].mode) {
                        n = a;
                        break
                    }
                n !== this._currentTextTrackIndex && this.setSubtitlesTrack(n + 1)
            }

            function m() {
                this.setTextTracks(this.video.textTracks)
            }

            function x(t) {
                if (t) {
                    this._textTracks || this._initTextTracks();
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e];
                        if (!i.kind || p(i.kind)) {
                            var a = I.call(this, i);
                            A.call(this, a), i.file && (i.data = [], n.loadFile(i, this.addVTTCuesToTrack.bind(this, a), D))
                        }
                    }
                    this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }

            function y(t, e) {
                if (this.renderNatively) {
                    var i = this._tracksById[t._id];
                    if (!i) return this._cuesByTrackId || (this._cuesByTrackId = {}), void(this._cuesByTrackId[t._id] = {
                        cues: e,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[t._id] || !this._cuesByTrackId[t._id].loaded) {
                        var n;
                        for (this._cuesByTrackId[t._id] = {
                            cues: e,
                            loaded: !0
                        }; n = e.shift();) C(this.renderNatively, i, n)
                    }
                }
            }

            function C(t, e, n) {
                if (!i.isIE() || !t || !window.TextTrackCue) return void e.addCue(n);
                var a = new window.TextTrackCue(n.startTime, n.endTime, n.text);
                e.addCue(a)
            }

            function E(e, n) {
                n && n.length && t.each(n, function(t) {
                    if (!(i.isIE() && e && /^(native|subtitle|cc)/.test(t._id))) {
                        t.mode = "disabled", t.mode = "hidden";
                        for (var n = t.cues.length; n--;) t.removeCue(t.cues[n]);
                        t.embedded || (t.mode = "disabled"), t.inuse = !1
                    }
                })
            }

            function p(t) {
                return "subtitles" === t || "captions" === t
            }

            function b() {
                this._textTracks = [], this._tracksById = {}, this._metaCuesByTextTime = {}, this._cuesByTrackId = {}, this._cachedVTTCues = {}, this._unknownCount = 0
            }

            function I(e) {
                var i, n = a.createLabel(e, this._unknownCount),
                    r = n.label;
                if (this._unknownCount = n.unknownCount, this.renderNatively || "metadata" === e.kind) {
                    var s = this.video.textTracks;
                    i = t.findWhere(s, {
                        label: r
                    }), i ? (i.kind = e.kind, i.language = e.language || "") : i = this.video.addTextTrack(e.kind, r, e.language || ""), i["default"] = e["default"], i.mode = "disabled", i.inuse = !0
                } else i = e, i.data = i.data || [];
                return i._id || (i._id = a.createId(e, this._textTracks.length)), i
            }

            function A(t) {
                this._textTracks.push(t), this._tracksById[t._id] = t
            }

            function L() {
                if (this._textTracks) {
                    var e = t.filter(this._textTracks, function(t) {
                        return t.embedded || "subs" === t.groupid
                    });
                    this._initTextTracks(), t.each(e, function(t) {
                        this._tracksById[t._id] = t
                    }), this._textTracks = e
                }
            }

            function B(i) {
                var n = i.currentTarget.activeCues;
                if (n && n.length) {
                    var a = n[n.length - 1].startTime;
                    if (this._activeCuePosition !== a) {
                        var r = [];
                        if (t.each(n, function(t) {
                            t.startTime < a || (t.data || t.value ? r.push(t) : t.text && this.trigger("meta", {
                                metadataTime: a,
                                metadata: JSON.parse(t.text)
                            }))
                        }, this), r.length) {
                            var s = e.parseID3(r);
                            this.trigger("meta", {
                                metadataTime: a,
                                metadata: s
                            })
                        }
                        this._activeCuePosition = a
                    }
                }
            }

            function R(t, e) {
                var i = t.kind;
                this._cachedVTTCues[t._id] || (this._cachedVTTCues[t._id] = {});
                var n, a = this._cachedVTTCues[t._id];
                switch (i) {
                    case "captions":
                    case "subtitles":
                        n = Math.floor(20 * e.startTime);
                        var r = "_" + e.line,
                            s = Math.floor(20 * e.endTime),
                            c = a[n + r] || a[n + 1 + r] || a[n - 1 + r];
                        return !(c && Math.abs(c - s) <= 1) && (a[n + r] = s, !0);
                    case "metadata":
                        var u = e.data ? new Uint8Array(e.data).join("") : e.text;
                        return n = e.startTime + u, !a[n] && (a[n] = e.endTime, !0);
                    default:
                        return !1
                }
            }

            function w(t) {
                if (t.length > this._textTracks.length) return !0;
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (!i._id || !this._tracksById[i._id]) return !0
                }
                return !1
            }

            function D(t) {
                i.log("CAPTIONS(" + t + ")")
            }
            var P = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: b,
                addTracksListener: l,
                clearTracks: _,
                clearCueData: k,
                disableTextTrack: f,
                enableTextTrack: v,
                getSubtitlesTrack: c,
                removeTracksListener: T,
                addTextTracks: x,
                setTextTracks: r,
                setupSideloadedTracks: s,
                setSubtitlesTrack: u,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: h,
                addCaptionsCue: d,
                addVTTCue: o,
                addVTTCuesToTrack: y,
                renderNatively: !1
            };
            return P
        }.apply(e, n), !(void 0 !== a && (t.exports = a))
    },
    9: function(t, e) {
        "use strict";

        function i(t) {
            return {
                bitrate: t.bitrate,
                label: t.label,
                width: t.width,
                height: t.height
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.qualityLevel = i
    },
    59: function(t, e, i) {
        var n, a, r = i(9);
        n = [i(2), i(1), i(4), i(5), i(65), i(10), i(3), i(8)], a = function(t, e, i, n, a, s, c, u) {
            function d(t) {
                return t + "_swf_" + l++
            }

            function o(e) {
                var i = document.createElement("a");
                i.href = e.flashplayer;
                var n = i.host === window.location.host;
                return t.isChrome() && !n
            }

            function h(h, l) {
                function T() {
                    E = setTimeout(function() {
                        c.trigger.call(B, "flashBlocked")
                    }, 4e3), x.once("embedded", function() {
                        k(), c.trigger.call(B, "flashUnblocked")
                    }, B)
                }

                function _() {
                    k(), T()
                }

                function k() {
                    clearTimeout(E), window.removeEventListener("focus", _)
                }

                function f(e) {
                    for (var i = e.levels, n = 0; n < i.length; n++) {
                        var a = i[n];
                        a.index = n, "Auto" !== a.label && (a.label = t.generateLabel(a, l.qualityLabels))
                    }
                    e.levels = b = v(e.levels), e.currentQuality = p = g(b, e.currentQuality)
                }

                function v(t) {
                    return t.sort(function(t, e) {
                        return t.height && e.height ? e.height - t.height : e.bitrate - t.bitrate
                    })
                }

                function g(t, e) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i].index === e) return i
                }
                var m, x, y, C = null,
                    E = -1,
                    p = -1,
                    b = null,
                    I = -1,
                    A = null,
                    L = !1,
                    B = this,
                    R = function() {
                        return x && x.__ready
                    },
                    w = function() {
                        x && x.triggerFlash.apply(x, arguments)
                    };
                e.extend(this, c, u, {
                    init: function(t) {
                        t.preload && "none" !== t.preload && !l.autostart && (C = t)
                    },
                    load: function(t) {
                        C = t, this.setState(n.LOADING), w("load", t), t.sources.length && "hls" !== t.sources[0].type && this.sendMediaType(t.sources)
                    },
                    play: function() {
                        w("play")
                    },
                    pause: function() {
                        w("pause"), this.setState(n.PAUSED)
                    },
                    stop: function() {
                        w("stop"), p = -1, C = null, this.clearTracks(), this.setState(n.IDLE)
                    },
                    seek: function(t) {
                        w("seek", t)
                    },
                    volume: function D(t) {
                        if (e.isNumber(t)) {
                            var D = Math.min(Math.max(0, t), 100);
                            R() && w("volume", D)
                        }
                    },
                    mute: function(t) {
                        R() && w("mute", t)
                    },
                    setState: function() {
                        return s.setState.apply(this, arguments)
                    },
                    getSwfObject: function(t) {
                        var e = t.querySelector("object");
                        return e ? (e.off(null, null, this), e) : a.embed(l.flashplayer, t, d(h), l.wmode)
                    },
                    getContainer: function() {
                        return m
                    },
                    setContainer: function(t) {
                        if (m !== t) {
                            m = t, x = this.getSwfObject(t), document.hasFocus() ? T() : window.addEventListener("focus", _), x.once("ready", function() {
                                k(), x.once("pluginsLoaded", function() {
                                    w("setupCommandQueue", x.__commandQueue), x.__commandQueue = []
                                });
                                var t = e.extend({}, l),
                                    n = x.triggerFlash("setup", t);
                                n === x ? x.__ready = !0 : this.trigger(i.JWPLAYER_MEDIA_ERROR, n), C && w("init", C)
                            }, this);
                            var a = [i.JWPLAYER_MEDIA_ERROR, i.JWPLAYER_MEDIA_SEEK, i.JWPLAYER_MEDIA_SEEKED, "subtitlesTrackChanged", "mediaType"],
                                r = [i.JWPLAYER_MEDIA_BUFFER, i.JWPLAYER_MEDIA_TIME],
                                s = [i.JWPLAYER_MEDIA_BUFFER_FULL];
                            x.on([i.JWPLAYER_MEDIA_LEVELS, i.JWPLAYER_MEDIA_LEVEL_CHANGED].join(" "), function(t) {
                                f(t), this.trigger(t.type, t)
                            }, this), x.on(i.JWPLAYER_AUDIO_TRACKS, function(t) {
                                I = t.currentTrack, A = t.tracks, this.trigger(t.type, t)
                            }, this), x.on(i.JWPLAYER_AUDIO_TRACK_CHANGED, function(t) {
                                I = t.currentTrack, A = t.tracks, this.trigger(t.type, t)
                            }, this), x.on(i.JWPLAYER_PLAYER_STATE, function(t) {
                                var e = t.newstate;
                                e !== n.IDLE && this.setState(e)
                            }, this), x.on(r.join(" "), function(t) {
                                "Infinity" === t.duration && (t.duration = 1 / 0), this.trigger(t.type, t)
                            }, this), x.on(a.join(" "), function(t) {
                                this.trigger(t.type, t)
                            }, this), x.on(s.join(" "), function(t) {
                                this.trigger(t.type)
                            }, this), x.on(i.JWPLAYER_MEDIA_BEFORECOMPLETE, function() {
                                this.trigger(i.JWPLAYER_MEDIA_COMPLETE)
                            }, this), x.on("visualQuality", function(t) {
                                var i = 0;
                                b.length > 1 && (i = g(b, t.level.index + 1)), t.level = e.extend(t.level, {
                                    index: i
                                }), t.reason = t.reason || "api", this.trigger("visualQuality", t), this.trigger("providerFirstFrame", {})
                            }, this), x.on(i.JWPLAYER_PROVIDER_CHANGED, function(t) {
                                y = t.message, this.trigger(i.JWPLAYER_PROVIDER_CHANGED, t)
                            }, this), x.on(i.JWPLAYER_ERROR, function(t) {
                                this.trigger(i.JWPLAYER_MEDIA_ERROR, t)
                            }, this), x.on("subtitlesTracks", function(t) {
                                this.addTextTracks(t.tracks)
                            }, this), x.on("subtitlesTrackData", function(t) {
                                this.addCuesToTrack(t)
                            }, this), x.on(i.JWPLAYER_MEDIA_META, function(t) {
                                t && (t.metadata && "textdata" === t.metadata.type ? this.addCaptionsCue(t.metadata) : this.trigger(t.type, t))
                            }, this), o(l) && x.on("throttle", function(t) {
                                k(), "resume" === t.state ? c.trigger.call(B, "flashThrottle", t) : E = setTimeout(function() {
                                    c.trigger.call(B, "flashThrottle", t)
                                }, 250)
                            }, this)
                        }
                    },
                    remove: function() {
                        p = -1, b = null, a.remove(x)
                    },
                    setVisibility: function(t) {
                        t = !!t, m.style.opacity = t ? 1 : 0
                    },
                    resize: function(t, e, i) {
                        i && w("stretch", i)
                    },
                    setControls: function(t) {
                        w("setControls", t)
                    },
                    setFullscreen: function(t) {
                        L = t, w("fullscreen", t)
                    },
                    getFullScreen: function() {
                        return L
                    },
                    setCurrentQuality: function(t) {
                        w("setCurrentQuality", b[t].index)
                    },
                    getCurrentQuality: function() {
                        return p
                    },
                    setSubtitlesTrack: function(t) {
                        w("setSubtitlesTrack", t)
                    },
                    getName: function() {
                        return y ? {
                            name: "flash_" + y
                        } : {
                            name: "flash"
                        }
                    },
                    getQualityLevels: function() {
                        return e.map(b || C && C.sources, function(t) {
                            return (0, r.qualityLevel)(t)
                        })
                    },
                    getAudioTracks: function() {
                        return A
                    },
                    getCurrentAudioTrack: function() {
                        return I
                    },
                    setCurrentAudioTrack: function(t) {
                        w("setCurrentAudioTrack", t)
                    },
                    destroy: function() {
                        k(), this.remove(), x && (x.off(), x = null), m = null, C = null, this.off()
                    }
                })
            }
            var l = 0,
                T = function() {};
            return T.prototype = s, h.prototype = new T, h.getName = function() {
                return {
                    name: "flash"
                }
            }, h
        }.apply(e, n), !(void 0 !== a && (t.exports = a))
    }
});