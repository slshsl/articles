/**
  @license
  Apache License 2.0 https://github.com/ReactiveX/RxJS/blob/master/LICENSE.txt
 **/
/**
  @license
  Apache License 2.0 https://github.com/ReactiveX/RxJS/blob/master/LICENSE.txt
 **/
/*
 *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
*****************************************************************************/
(function (g, y) {
	'object' === typeof exports && 'undefined' !== typeof module
		? y(exports)
		: 'function' === typeof define && define.amd
		? define('rxjs', ['exports'], y)
		: y((g.rxjs = {}));
})(this, function (g) {
	function y(b, a) {
		function c() {
			this.constructor = b;
		}
		if ('function' !== typeof a && null !== a)
			throw new TypeError(
				'Class extends value ' + String(a) + ' is not a constructor or null'
			);
		Ua(b, a);
		b.prototype =
			null === a ? Object.create(a) : ((c.prototype = a.prototype), new c());
	}
	function $d(b, a) {
		var c = {},
			d;
		for (d in b)
			Object.prototype.hasOwnProperty.call(b, d) &&
				0 > a.indexOf(d) &&
				(c[d] = b[d]);
		if (null != b && 'function' === typeof Object.getOwnPropertySymbols) {
			var e = 0;
			for (d = Object.getOwnPropertySymbols(b); e < d.length; e++)
				0 > a.indexOf(d[e]) &&
					Object.prototype.propertyIsEnumerable.call(b, d[e]) &&
					(c[d[e]] = b[d[e]]);
		}
		return c;
	}
	function ae(b, a, c, d) {
		function e(a) {
			return a instanceof c
				? a
				: new c(function (b) {
						b(a);
				  });
		}
		return new (c || (c = Promise))(function (c, h) {
			function f(a) {
				try {
					w(d.next(a));
				} catch (v) {
					h(v);
				}
			}
			function k(a) {
				try {
					w(d['throw'](a));
				} catch (v) {
					h(v);
				}
			}
			function w(a) {
				a.done ? c(a.value) : e(a.value).then(f, k);
			}
			w((d = d.apply(b, a || [])).next());
		});
	}
	function Va(b, a) {
		function c(a) {
			return function (b) {
				return d([a, b]);
			};
		}
		function d(c) {
			if (f) throw new TypeError('Generator is already executing.');
			for (; e; )
				try {
					if (
						((f = 1),
						h &&
							(l =
								c[0] & 2
									? h['return']
									: c[0]
									? h['throw'] || ((l = h['return']) && l.call(h), 0)
									: h.next) &&
							!(l = l.call(h, c[1])).done)
					)
						return l;
					if (((h = 0), l)) c = [c[0] & 2, l.value];
					switch (c[0]) {
						case 0:
						case 1:
							l = c;
							break;
						case 4:
							return e.label++, { value: c[1], done: !1 };
						case 5:
							e.label++;
							h = c[1];
							c = [0];
							continue;
						case 7:
							c = e.ops.pop();
							e.trys.pop();
							continue;
						default:
							if (
								!((l = e.trys), (l = 0 < l.length && l[l.length - 1])) &&
								(6 === c[0] || 2 === c[0])
							) {
								e = 0;
								continue;
							}
							if (3 === c[0] && (!l || (c[1] > l[0] && c[1] < l[3])))
								e.label = c[1];
							else if (6 === c[0] && e.label < l[1]) (e.label = l[1]), (l = c);
							else if (l && e.label < l[2]) (e.label = l[2]), e.ops.push(c);
							else {
								l[2] && e.ops.pop();
								e.trys.pop();
								continue;
							}
					}
					c = a.call(b, e);
				} catch (r) {
					(c = [6, r]), (h = 0);
				} finally {
					f = l = 0;
				}
			if (c[0] & 5) throw c[1];
			return { value: c[0] ? c[1] : void 0, done: !0 };
		}
		var e = {
				label: 0,
				sent: function () {
					if (l[0] & 1) throw l[1];
					return l[1];
				},
				trys: [],
				ops: []
			},
			f,
			h,
			l,
			k;
		return (
			(k = { next: c(0), throw: c(1), return: c(2) }),
			'function' === typeof Symbol &&
				(k[Symbol.iterator] = function () {
					return this;
				}),
			k
		);
	}
	function F(b) {
		var a = 'function' === typeof Symbol && Symbol.iterator,
			c = a && b[a],
			d = 0;
		if (c) return c.call(b);
		if (b && 'number' === typeof b.length)
			return {
				next: function () {
					b && d >= b.length && (b = void 0);
					return { value: b && b[d++], done: !b };
				}
			};
		throw new TypeError(
			a ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
		);
	}
	function x(b, a) {
		var c = 'function' === typeof Symbol && b[Symbol.iterator];
		if (!c) return b;
		b = c.call(b);
		var d,
			e = [],
			f;
		try {
			for (; (void 0 === a || 0 < a--) && !(d = b.next()).done; )
				e.push(d.value);
		} catch (h) {
			f = { error: h };
		} finally {
			try {
				d && !d.done && (c = b['return']) && c.call(b);
			} finally {
				if (f) throw f.error;
			}
		}
		return e;
	}
	function z(b, a, c) {
		if (c || 2 === arguments.length)
			for (var d = 0, e = a.length, f; d < e; d++)
				(!f && d in a) ||
					(f || (f = Array.prototype.slice.call(a, 0, d)), (f[d] = a[d]));
		return b.concat(f || Array.prototype.slice.call(a));
	}
	function da(b) {
		return this instanceof da ? ((this.v = b), this) : new da(b);
	}
	function be(b, a, c) {
		function d(a) {
			k[a] &&
				(w[a] = function (c) {
					return new Promise(function (b, d) {
						1 < g.push([a, c, b, d]) || e(a, c);
					});
				});
		}
		function e(a, c) {
			try {
				var b = k[a](c);
				b.value instanceof da
					? Promise.resolve(b.value.v).then(f, h)
					: l(g[0][2], b);
			} catch (u) {
				l(g[0][3], u);
			}
		}
		function f(a) {
			e('next', a);
		}
		function h(a) {
			e('throw', a);
		}
		function l(a, c) {
			(a(c), g.shift(), g.length) && e(g[0][0], g[0][1]);
		}
		if (!Symbol.asyncIterator)
			throw new TypeError('Symbol.asyncIterator is not defined.');
		var k = c.apply(b, a || []),
			w,
			g = [];
		return (
			(w = {}),
			d('next'),
			d('throw'),
			d('return'),
			(w[Symbol.asyncIterator] = function () {
				return this;
			}),
			w
		);
	}
	function ce(b) {
		function a(a) {
			e[a] =
				b[a] &&
				function (d) {
					return new Promise(function (e, f) {
						d = b[a](d);
						c(e, f, d.done, d.value);
					});
				};
		}
		function c(a, c, b, d) {
			Promise.resolve(d).then(function (c) {
				a({ value: c, done: b });
			}, c);
		}
		if (!Symbol.asyncIterator)
			throw new TypeError('Symbol.asyncIterator is not defined.');
		var d = b[Symbol.asyncIterator],
			e;
		return d
			? d.call(b)
			: ((b = 'function' === typeof F ? F(b) : b[Symbol.iterator]()),
			  (e = {}),
			  a('next'),
			  a('throw'),
			  a('return'),
			  (e[Symbol.asyncIterator] = function () {
					return this;
			  }),
			  e);
	}
	function p(b) {
		return 'function' === typeof b;
	}
	function S(b) {
		b = b(function (a) {
			Error.call(a);
			a.stack = Error().stack;
		});
		b.prototype = Object.create(Error.prototype);
		return (b.prototype.constructor = b);
	}
	function M(b, a) {
		b && ((a = b.indexOf(a)), 0 <= a && b.splice(a, 1));
	}
	function Ib(b) {
		return (
			b instanceof D ||
			(b && 'closed' in b && p(b.remove) && p(b.add) && p(b.unsubscribe))
		);
	}
	function Jb(b) {
		ea.setTimeout(function () {
			var a = T.onUnhandledError;
			if (a) a(b);
			else throw b;
		});
	}
	function C() {}
	function J(b, a, c) {
		return { kind: b, value: a, error: c };
	}
	function Ca(b) {
		if (T.useDeprecatedSynchronousErrorHandling) {
			var a = !V;
			a && (V = { errorThrown: !1, error: null });
			b();
			if (a && ((a = V), (b = a.errorThrown), (a = a.error), (V = null), b))
				throw a;
		} else b();
	}
	function Da(b) {
		T.useDeprecatedSynchronousErrorHandling
			? T.useDeprecatedSynchronousErrorHandling &&
			  V &&
			  ((V.errorThrown = !0), (V.error = b))
			: Jb(b);
	}
	function Wa(b, a) {
		var c = T.onStoppedNotification;
		c &&
			ea.setTimeout(function () {
				return c(b, a);
			});
	}
	function E(b) {
		return b;
	}
	function Xa() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return Kb(b);
	}
	function Kb(b) {
		return 0 === b.length
			? E
			: 1 === b.length
			? b[0]
			: function (a) {
					return b.reduce(function (a, b) {
						return b(a);
					}, a);
			  };
	}
	function Lb(b) {
		var a;
		return null !== (a = null !== b && void 0 !== b ? b : T.Promise) &&
			void 0 !== a
			? a
			: Promise;
	}
	function de(b) {
		var a;
		(a = b && b instanceof oa) ||
			(a = b && p(b.next) && p(b.error) && p(b.complete) && Ib(b));
		return a;
	}
	function n(b) {
		return function (a) {
			if (p(null === a || void 0 === a ? void 0 : a.lift))
				return a.lift(function (a) {
					try {
						return b(a, this);
					} catch (d) {
						this.error(d);
					}
				});
			throw new TypeError('Unable to lift unknown Observable type');
		};
	}
	function m(b, a, c, d, e) {
		return new Ya(b, a, c, d, e);
	}
	function Za() {
		return n(function (b, a) {
			var c = null;
			b._refCount++;
			var d = m(a, void 0, void 0, void 0, function () {
				if (!b || 0 >= b._refCount || 0 < --b._refCount) c = null;
				else {
					var d = b._connection,
						f = c;
					c = null;
					!d || (f && d !== f) || d.unsubscribe();
					a.unsubscribe();
				}
			});
			b.subscribe(d);
			d.closed || (c = b.connect());
		});
	}
	function Mb(b) {
		return new t(function (a) {
			var c = b || Ea,
				d = c.now(),
				e = 0,
				f = function () {
					a.closed ||
						(e = N.requestAnimationFrame(function (h) {
							e = 0;
							var l = c.now();
							a.next({ timestamp: b ? l : h, elapsed: l - d });
							f();
						}));
				};
			f();
			return function () {
				e && N.cancelAnimationFrame(e);
			};
		});
	}
	function Nb(b) {
		return b in $a ? (delete $a[b], !0) : !1;
	}
	function ee(b) {
		return new t(function (a) {
			return b.schedule(function () {
				return a.complete();
			});
		});
	}
	function Fa(b) {
		return b && p(b.schedule);
	}
	function pa(b) {
		return p(b[b.length - 1]) ? b.pop() : void 0;
	}
	function O(b) {
		return Fa(b[b.length - 1]) ? b.pop() : void 0;
	}
	function Ob(b) {
		return (
			Symbol.asyncIterator &&
			p(null === b || void 0 === b ? void 0 : b[Symbol.asyncIterator])
		);
	}
	function Pb(b) {
		return new TypeError(
			'You provided ' +
				(null !== b && 'object' === typeof b
					? 'an invalid object'
					: "'" + b + "'") +
				' where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.'
		);
	}
	function Qb(b) {
		return p(null === b || void 0 === b ? void 0 : b[ab]);
	}
	function Rb(b) {
		return be(this, arguments, function () {
			var a, c, d, e;
			return Va(this, function (f) {
				switch (f.label) {
					case 0:
						(a = b.getReader()), (f.label = 1);
					case 1:
						f.trys.push([1, , 9, 10]), (f.label = 2);
					case 2:
						return [4, da(a.read())];
					case 3:
						return (
							(c = f.sent()),
							(d = c.value),
							(e = c.done) ? [4, da(void 0)] : [3, 5]
						);
					case 4:
						return [2, f.sent()];
					case 5:
						return [4, da(d)];
					case 6:
						return [4, f.sent()];
					case 7:
						return f.sent(), [3, 2];
					case 8:
						return [3, 10];
					case 9:
						return a.releaseLock(), [7];
					case 10:
						return [2];
				}
			});
		});
	}
	function q(b) {
		if (b instanceof t) return b;
		if (null != b) {
			if (p(b[qa])) return fe(b);
			if (bb(b)) return ge(b);
			if (p(null === b || void 0 === b ? void 0 : b.then)) return he(b);
			if (Ob(b)) return Sb(b);
			if (Qb(b)) return ie(b);
			if (p(null === b || void 0 === b ? void 0 : b.getReader))
				return Sb(Rb(b));
		}
		throw Pb(b);
	}
	function fe(b) {
		return new t(function (a) {
			var c = b[qa]();
			if (p(c.subscribe)) return c.subscribe(a);
			throw new TypeError(
				'Provided object does not correctly implement Symbol.observable'
			);
		});
	}
	function ge(b) {
		return new t(function (a) {
			for (var c = 0; c < b.length && !a.closed; c++) a.next(b[c]);
			a.complete();
		});
	}
	function he(b) {
		return new t(function (a) {
			b.then(
				function (c) {
					a.closed || (a.next(c), a.complete());
				},
				function (c) {
					return a.error(c);
				}
			).then(null, Jb);
		});
	}
	function ie(b) {
		return new t(function (a) {
			var c, d;
			try {
				for (var e = F(b), f = e.next(); !f.done; f = e.next())
					if ((a.next(f.value), a.closed)) return;
			} catch (h) {
				c = { error: h };
			} finally {
				try {
					f && !f.done && (d = e.return) && d.call(e);
				} finally {
					if (c) throw c.error;
				}
			}
			a.complete();
		});
	}
	function Sb(b) {
		return new t(function (a) {
			je(b, a).catch(function (c) {
				return a.error(c);
			});
		});
	}
	function je(b, a) {
		var c, d, e, f;
		return ae(this, void 0, void 0, function () {
			var h, l;
			return Va(this, function (k) {
				switch (k.label) {
					case 0:
						k.trys.push([0, 5, 6, 11]), (c = ce(b)), (k.label = 1);
					case 1:
						return [4, c.next()];
					case 2:
						if (((d = k.sent()), d.done)) return [3, 4];
						h = d.value;
						a.next(h);
						if (a.closed) return [2];
						k.label = 3;
					case 3:
						return [3, 1];
					case 4:
						return [3, 11];
					case 5:
						return (l = k.sent()), (e = { error: l }), [3, 11];
					case 6:
						return (
							k.trys.push([6, , 9, 10]),
							d && !d.done && (f = c.return) ? [4, f.call(c)] : [3, 8]
						);
					case 7:
						k.sent(), (k.label = 8);
					case 8:
						return [3, 10];
					case 9:
						if (e) throw e.error;
						return [7];
					case 10:
						return [7];
					case 11:
						return a.complete(), [2];
				}
			});
		});
	}
	function G(b, a, c, d, e) {
		void 0 === d && (d = 0);
		void 0 === e && (e = !1);
		a = a.schedule(function () {
			c();
			e ? b.add(this.schedule(null, d)) : this.unsubscribe();
		}, d);
		b.add(a);
		if (!e) return a;
	}
	function ra(b, a) {
		void 0 === a && (a = 0);
		return n(function (c, d) {
			c.subscribe(
				m(
					d,
					function (c) {
						return G(
							d,
							b,
							function () {
								return d.next(c);
							},
							a
						);
					},
					function () {
						return G(
							d,
							b,
							function () {
								return d.complete();
							},
							a
						);
					},
					function (c) {
						return G(
							d,
							b,
							function () {
								return d.error(c);
							},
							a
						);
					}
				)
			);
		});
	}
	function sa(b, a) {
		void 0 === a && (a = 0);
		return n(function (c, d) {
			d.add(
				b.schedule(function () {
					return c.subscribe(d);
				}, a)
			);
		});
	}
	function ke(b, a) {
		return new t(function (c) {
			var d = 0;
			return a.schedule(function () {
				d === b.length
					? c.complete()
					: (c.next(b[d++]), c.closed || this.schedule());
			});
		});
	}
	function Tb(b, a) {
		return new t(function (c) {
			var d;
			G(c, a, function () {
				d = b[ab]();
				G(
					c,
					a,
					function () {
						var a, b, h;
						try {
							(a = d.next()), (b = a.value), (h = a.done);
						} catch (l) {
							c.error(l);
							return;
						}
						h ? c.complete() : c.next(b);
					},
					0,
					!0
				);
			});
			return function () {
				return p(null === d || void 0 === d ? void 0 : d.return) && d.return();
			};
		});
	}
	function Ub(b, a) {
		if (!b) throw Error('Iterable cannot be null');
		return new t(function (c) {
			G(c, a, function () {
				var d = b[Symbol.asyncIterator]();
				G(
					c,
					a,
					function () {
						d.next().then(function (a) {
							a.done ? c.complete() : c.next(a.value);
						});
					},
					0,
					!0
				);
			});
		});
	}
	function Vb(b, a) {
		if (null != b) {
			if (p(b[qa])) return q(b).pipe(sa(a), ra(a));
			if (bb(b)) return ke(b, a);
			if (p(null === b || void 0 === b ? void 0 : b.then))
				return q(b).pipe(sa(a), ra(a));
			if (Ob(b)) return Ub(b, a);
			if (Qb(b)) return Tb(b, a);
			if (p(null === b || void 0 === b ? void 0 : b.getReader))
				return Ub(Rb(b), a);
		}
		throw Pb(b);
	}
	function P(b, a) {
		return a ? Vb(b, a) : q(b);
	}
	function cb() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		a = O(b);
		return P(b, a);
	}
	function Wb(b, a) {
		var c = p(b)
				? b
				: function () {
						return b;
				  },
			d = function (a) {
				return a.error(c());
			};
		return new t(
			a
				? function (c) {
						return a.schedule(d, 0, c);
				  }
				: d
		);
	}
	function Ga(b, a) {
		var c,
			d,
			e,
			f = b.kind,
			h = b.value;
		b = b.error;
		if ('string' !== typeof f)
			throw new TypeError('Invalid notification, missing "kind"');
		'N' === f
			? null === (c = a.next) || void 0 === c
				? void 0
				: c.call(a, h)
			: 'E' === f
			? null === (d = a.error) || void 0 === d
				? void 0
				: d.call(a, b)
			: null === (e = a.complete) || void 0 === e
			? void 0
			: e.call(a);
	}
	function db(b) {
		return b instanceof Date && !isNaN(b);
	}
	function eb(b, a) {
		b = db(b) ? { first: b } : 'number' === typeof b ? { each: b } : b;
		var c = b.first,
			d = b.each,
			e = b.with,
			f = void 0 === e ? le : e,
			e = b.scheduler,
			h = void 0 === e ? (null !== a && void 0 !== a ? a : I) : e;
		a = b.meta;
		var l = void 0 === a ? null : a;
		if (null == c && null == d) throw new TypeError('No timeout provided.');
		return n(function (a, b) {
			var e,
				k,
				g = null,
				w = 0,
				u = function (a) {
					k = G(
						b,
						h,
						function () {
							try {
								e.unsubscribe(),
									q(f({ meta: l, lastValue: g, seen: w })).subscribe(b);
							} catch (W) {
								b.error(W);
							}
						},
						a
					);
				};
			e = a.subscribe(
				m(
					b,
					function (a) {
						null === k || void 0 === k ? void 0 : k.unsubscribe();
						w++;
						b.next((g = a));
						0 < d && u(d);
					},
					void 0,
					void 0,
					function () {
						(null === k || void 0 === k ? 0 : k.closed) ||
							(null === k || void 0 === k ? void 0 : k.unsubscribe());
						g = null;
					}
				)
			);
			!w && u(null != c ? ('number' === typeof c ? c : +c - h.now()) : d);
		});
	}
	function le(b) {
		throw new Xb(b);
	}
	function Q(b, a) {
		return n(function (c, d) {
			var e = 0;
			c.subscribe(
				m(d, function (c) {
					d.next(b.call(a, c, e++));
				})
			);
		});
	}
	function X(b) {
		return Q(function (a) {
			return me(a) ? b.apply(void 0, z([], x(a))) : b(a);
		});
	}
	function Ha(b, a, c, d) {
		if (c)
			if (Fa(c)) d = c;
			else
				return function () {
					for (var e = [], f = 0; f < arguments.length; f++)
						e[f] = arguments[f];
					return Ha(b, a, d).apply(this, e).pipe(X(c));
				};
		return d
			? function () {
					for (var c = [], f = 0; f < arguments.length; f++)
						c[f] = arguments[f];
					return Ha(b, a).apply(this, c).pipe(sa(d), ra(d));
			  }
			: function () {
					for (var c = this, d = [], h = 0; h < arguments.length; h++)
						d[h] = arguments[h];
					var l = new fb(),
						k = !0;
					return new t(function (e) {
						e = l.subscribe(e);
						if (k) {
							var f = (k = !1),
								h = !1;
							a.apply(
								c,
								z(z([], x(d)), [
									function () {
										for (var a = [], c = 0; c < arguments.length; c++)
											a[c] = arguments[c];
										if (b && ((c = a.shift()), null != c)) {
											l.error(c);
											return;
										}
										l.next(1 < a.length ? a : a[0]);
										h = !0;
										f && l.complete();
									}
								])
							);
							h && l.complete();
							f = !0;
						}
						return e;
					});
			  };
	}
	function Yb(b) {
		if (1 === b.length) {
			var a = b[0];
			if (ne(a)) return { args: a, keys: null };
			if (a && 'object' === typeof a && oe(a) === pe)
				return (
					(b = qe(a)),
					{
						args: b.map(function (c) {
							return a[c];
						}),
						keys: b
					}
				);
		}
		return { args: b, keys: null };
	}
	function Zb(b, a) {
		return b.reduce(function (c, b, e) {
			return (c[b] = a[e]), c;
		}, {});
	}
	function $b() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = O(b),
			a = pa(b),
			b = Yb(b),
			d = b.args,
			e = b.keys;
		if (0 === d.length) return P([], c);
		c = new t(
			ac(
				d,
				c,
				e
					? function (a) {
							return Zb(e, a);
					  }
					: E
			)
		);
		return a ? c.pipe(X(a)) : c;
	}
	function ac(b, a, c) {
		void 0 === c && (c = E);
		return function (d) {
			bc(
				a,
				function () {
					for (
						var e = b.length,
							f = Array(e),
							h = e,
							l = e,
							k = function (e) {
								bc(
									a,
									function () {
										var k = !1;
										P(b[e], a).subscribe(
											m(
												d,
												function (a) {
													f[e] = a;
													k || ((k = !0), l--);
													l || d.next(c(f.slice()));
												},
												function () {
													--h || d.complete();
												}
											)
										);
									},
									d
								);
							},
							g = 0;
						g < e;
						g++
					)
						k(g);
				},
				d
			);
		};
	}
	function bc(b, a, c) {
		b ? G(c, b, a) : a();
	}
	function gb(b, a, c, d, e, f, h, l) {
		var k = [],
			g = 0,
			r = 0,
			v = !1,
			A = function (a) {
				return g < d ? n(a) : k.push(a);
			},
			n = function (b) {
				f && a.next(b);
				g++;
				var l = !1;
				q(c(b, r++)).subscribe(
					m(
						a,
						function (c) {
							null === e || void 0 === e ? void 0 : e(c);
							f ? A(c) : a.next(c);
						},
						function () {
							l = !0;
						},
						void 0,
						function () {
							if (l)
								try {
									g--;
									for (
										var c = function () {
											var c = k.shift();
											h
												? G(a, h, function () {
														return n(c);
												  })
												: n(c);
										};
										k.length && g < d;

									)
										c();
									!v || k.length || g || a.complete();
								} catch (Y) {
									a.error(Y);
								}
						}
					)
				);
			};
		b.subscribe(
			m(a, A, function () {
				v = !0;
				!v || k.length || g || a.complete();
			})
		);
		return function () {
			null === l || void 0 === l ? void 0 : l();
		};
	}
	function H(b, a, c) {
		void 0 === c && (c = Infinity);
		if (p(a))
			return H(function (c, e) {
				return Q(function (b, d) {
					return a(c, b, e, d);
				})(q(b(c, e)));
			}, c);
		'number' === typeof a && (c = a);
		return n(function (a, e) {
			return gb(a, e, b, c);
		});
	}
	function ta(b) {
		void 0 === b && (b = Infinity);
		return H(E, b);
	}
	function Ia() {
		return ta(1);
	}
	function ua() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return Ia()(P(b, O(b)));
	}
	function Ja(b) {
		return new t(function (a) {
			q(b()).subscribe(a);
		});
	}
	function hb(b, a, c, d) {
		p(c) && ((d = c), (c = void 0));
		if (d) return hb(b, a, c).pipe(X(d));
		d = x(
			re(b)
				? se.map(function (d) {
						return function (e) {
							return b[d](a, e, c);
						};
				  })
				: te(b)
				? ue.map(cc(b, a))
				: ve(b)
				? we.map(cc(b, a))
				: [],
			2
		);
		var e = d[0],
			f = d[1];
		if (!e && bb(b))
			return H(function (b) {
				return hb(b, a, c);
			})(q(b));
		if (!e) throw new TypeError('Invalid event target');
		return new t(function (a) {
			var c = function () {
				for (var c = [], b = 0; b < arguments.length; b++) c[b] = arguments[b];
				return a.next(1 < c.length ? c : c[0]);
			};
			e(c);
			return function () {
				return f(c);
			};
		});
	}
	function cc(b, a) {
		return function (c) {
			return function (d) {
				return b[c](a, d);
			};
		};
	}
	function te(b) {
		return p(b.addListener) && p(b.removeListener);
	}
	function ve(b) {
		return p(b.on) && p(b.off);
	}
	function re(b) {
		return p(b.addEventListener) && p(b.removeEventListener);
	}
	function dc(b, a, c) {
		return c
			? dc(b, a).pipe(X(c))
			: new t(function (c) {
					var d = function () {
							for (var a = [], b = 0; b < arguments.length; b++)
								a[b] = arguments[b];
							return c.next(1 === a.length ? a[0] : a);
						},
						f = b(d);
					return p(a)
						? function () {
								return a(d, f);
						  }
						: void 0;
			  });
	}
	function Z(b, a, c) {
		void 0 === b && (b = 0);
		void 0 === c && (c = ib);
		var d = -1;
		null != a && (Fa(a) ? (c = a) : (d = a));
		return new t(function (a) {
			var e = db(b) ? +b - c.now() : b;
			0 > e && (e = 0);
			var h = 0;
			return c.schedule(function () {
				a.closed ||
					(a.next(h++), 0 <= d ? this.schedule(void 0, d) : a.complete());
			}, e);
		});
	}
	function ec(b, a) {
		void 0 === b && (b = 0);
		void 0 === a && (a = I);
		0 > b && (b = 0);
		return Z(b, b, a);
	}
	function aa(b) {
		return 1 === b.length && xe(b[0]) ? b[0] : b;
	}
	function fc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = aa(b);
		return new t(function (a) {
			var b = 0,
				d = function () {
					if (b < c.length) {
						var e = void 0;
						try {
							e = q(c[b++]);
						} catch (k) {
							d();
							return;
						}
						var f = new Ya(a, void 0, C, C);
						e.subscribe(f);
						f.add(d);
					} else a.complete();
				};
			d();
		});
	}
	function gc(b, a) {
		return function (c, d) {
			return !b.call(a, c, d);
		};
	}
	function K(b, a) {
		return n(function (c, d) {
			var e = 0;
			c.subscribe(
				m(d, function (c) {
					return b.call(a, c, e++) && d.next(c);
				})
			);
		});
	}
	function hc(b) {
		return function (a) {
			for (
				var c = [],
					d = function (d) {
						c.push(
							q(b[d]).subscribe(
								m(a, function (b) {
									if (c) {
										for (var e = 0; e < c.length; e++)
											e !== d && c[e].unsubscribe();
										c = null;
									}
									a.next(b);
								})
							)
						);
					},
					e = 0;
				c && !a.closed && e < b.length;
				e++
			)
				d(e);
		};
	}
	function jb() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = pa(b),
			d = aa(b);
		return d.length
			? new t(function (a) {
					var b = d.map(function () {
							return [];
						}),
						e = d.map(function () {
							return !1;
						});
					a.add(function () {
						b = e = null;
					});
					for (
						var l = function (f) {
								q(d[f]).subscribe(
									m(
										a,
										function (d) {
											b[f].push(d);
											b.every(function (a) {
												return a.length;
											}) &&
												((d = b.map(function (a) {
													return a.shift();
												})),
												a.next(c ? c.apply(void 0, z([], x(d))) : d),
												b.some(function (a, c) {
													return !a.length && e[c];
												}) && a.complete());
										},
										function () {
											e[f] = !0;
											!b[f].length && a.complete();
										}
									)
								);
							},
							k = 0;
						!a.closed && k < d.length;
						k++
					)
						l(k);
					return function () {
						b = e = null;
					};
			  })
			: L;
	}
	function kb(b) {
		return n(function (a, c) {
			var d = !1,
				e = null,
				f = null,
				h = !1,
				l = function () {
					null === f || void 0 === f ? void 0 : f.unsubscribe();
					f = null;
					if (d) {
						d = !1;
						var a = e;
						e = null;
						c.next(a);
					}
					h && c.complete();
				},
				k = function () {
					f = null;
					h && c.complete();
				};
			a.subscribe(
				m(
					c,
					function (a) {
						d = !0;
						e = a;
						f || q(b(a)).subscribe((f = m(c, l, k)));
					},
					function () {
						h = !0;
						(d && f && !f.closed) || c.complete();
					}
				)
			);
		});
	}
	function ic(b, a) {
		void 0 === a && (a = I);
		return kb(function () {
			return Z(b, a);
		});
	}
	function jc(b) {
		return n(function (a, c) {
			var d = [];
			a.subscribe(
				m(
					c,
					function (a) {
						return d.push(a);
					},
					function () {
						c.next(d);
						c.complete();
					}
				)
			);
			q(b).subscribe(
				m(
					c,
					function () {
						var a = d;
						d = [];
						c.next(a);
					},
					C
				)
			);
			return function () {
				d = null;
			};
		});
	}
	function kc(b, a) {
		void 0 === a && (a = null);
		a = null !== a && void 0 !== a ? a : b;
		return n(function (c, d) {
			var e = [],
				f = 0;
			c.subscribe(
				m(
					d,
					function (c) {
						var h,
							k,
							g,
							r,
							v = null;
						0 === f++ % a && e.push([]);
						try {
							for (var m = F(e), n = m.next(); !n.done; n = m.next()) {
								var u = n.value;
								u.push(c);
								b <= u.length &&
									((v = null !== v && void 0 !== v ? v : []), v.push(u));
							}
						} catch (Y) {
							h = { error: Y };
						} finally {
							try {
								n && !n.done && (k = m.return) && k.call(m);
							} finally {
								if (h) throw h.error;
							}
						}
						if (v)
							try {
								for (var fa = F(v), W = fa.next(); !W.done; W = fa.next())
									(u = W.value), M(e, u), d.next(u);
							} catch (Y) {
								g = { error: Y };
							} finally {
								try {
									W && !W.done && (r = fa.return) && r.call(fa);
								} finally {
									if (g) throw g.error;
								}
							}
					},
					function () {
						var a, c;
						try {
							for (var b = F(e), f = b.next(); !f.done; f = b.next())
								d.next(f.value);
						} catch (r) {
							a = { error: r };
						} finally {
							try {
								f && !f.done && (c = b.return) && c.call(b);
							} finally {
								if (a) throw a.error;
							}
						}
						d.complete();
					},
					void 0,
					function () {
						e = null;
					}
				)
			);
		});
	}
	function lc(b) {
		for (var a, c, d = [], e = 1; e < arguments.length; e++)
			d[e - 1] = arguments[e];
		var f = null !== (a = O(d)) && void 0 !== a ? a : I,
			h = null !== (c = d[0]) && void 0 !== c ? c : null,
			l = d[1] || Infinity;
		return n(function (a, c) {
			var d = [],
				e = !1,
				k = function (a) {
					var b = a.buffer;
					a.subs.unsubscribe();
					M(d, a);
					c.next(b);
					e && g();
				},
				g = function () {
					if (d) {
						var a = new D();
						c.add(a);
						var e = { buffer: [], subs: a };
						d.push(e);
						G(
							a,
							f,
							function () {
								return k(e);
							},
							b
						);
					}
				};
			null !== h && 0 <= h ? G(c, f, g, h, !0) : (e = !0);
			g();
			var w = m(
				c,
				function (a) {
					var c,
						b,
						e = d.slice();
					try {
						for (var f = F(e), h = f.next(); !h.done; h = f.next()) {
							var g = h.value,
								w = g.buffer;
							w.push(a);
							l <= w.length && k(g);
						}
					} catch (Ae) {
						c = { error: Ae };
					} finally {
						try {
							h && !h.done && (b = f.return) && b.call(f);
						} finally {
							if (c) throw c.error;
						}
					}
				},
				function () {
					for (; null === d || void 0 === d ? 0 : d.length; )
						c.next(d.shift().buffer);
					null === w || void 0 === w ? void 0 : w.unsubscribe();
					c.complete();
					c.unsubscribe();
				},
				void 0,
				function () {
					return (d = null);
				}
			);
			a.subscribe(w);
		});
	}
	function mc(b, a) {
		return n(function (c, d) {
			var e = [];
			q(b).subscribe(
				m(
					d,
					function (c) {
						var b = [];
						e.push(b);
						var f = new D();
						f.add(
							q(a(c)).subscribe(
								m(
									d,
									function () {
										M(e, b);
										d.next(b);
										f.unsubscribe();
									},
									C
								)
							)
						);
					},
					C
				)
			);
			c.subscribe(
				m(
					d,
					function (a) {
						var c, b;
						try {
							for (var d = F(e), f = d.next(); !f.done; f = d.next())
								f.value.push(a);
						} catch (r) {
							c = { error: r };
						} finally {
							try {
								f && !f.done && (b = d.return) && b.call(d);
							} finally {
								if (c) throw c.error;
							}
						}
					},
					function () {
						for (; 0 < e.length; ) d.next(e.shift());
						d.complete();
					}
				)
			);
		});
	}
	function nc(b) {
		return n(function (a, c) {
			var d = null,
				e = null,
				f = function () {
					null === e || void 0 === e ? void 0 : e.unsubscribe();
					var a = d;
					d = [];
					a && c.next(a);
					q(b()).subscribe((e = m(c, f, C)));
				};
			f();
			a.subscribe(
				m(
					c,
					function (a) {
						return null === d || void 0 === d ? void 0 : d.push(a);
					},
					function () {
						d && c.next(d);
						c.complete();
					},
					void 0,
					function () {
						return (d = e = null);
					}
				)
			);
		});
	}
	function lb(b) {
		return n(function (a, c) {
			var d = null,
				e = !1,
				f,
				d = a.subscribe(
					m(c, void 0, void 0, function (h) {
						f = q(b(h, lb(b)(a)));
						d ? (d.unsubscribe(), (d = null), f.subscribe(c)) : (e = !0);
					})
				);
			e && (d.unsubscribe(), (d = null), f.subscribe(c));
		});
	}
	function oc(b, a, c, d, e) {
		return function (f, h) {
			var l = c,
				k = a,
				g = 0;
			f.subscribe(
				m(
					h,
					function (a) {
						var c = g++;
						k = l ? b(k, a, c) : ((l = !0), a);
						d && h.next(k);
					},
					e &&
						function () {
							l && h.next(k);
							h.complete();
						}
				)
			);
		};
	}
	function ga(b, a) {
		return n(oc(b, a, 2 <= arguments.length, !1, !0));
	}
	function mb() {
		return n(function (b, a) {
			ga(Be, [])(b).subscribe(a);
		});
	}
	function pc(b, a) {
		return Xa(
			mb(),
			H(function (a) {
				return b(a);
			}),
			a ? X(a) : E
		);
	}
	function Ka(b) {
		return pc($b, b);
	}
	function nb() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return (a = pa(b))
			? Xa(nb.apply(void 0, z([], x(b))), X(a))
			: n(function (a, d) {
					ac(z([a], x(aa(b))))(d);
			  });
	}
	function qc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return nb.apply(void 0, z([], x(b)));
	}
	function La(b, a) {
		return p(a) ? H(b, a, 1) : H(b, 1);
	}
	function rc(b, a) {
		return p(a)
			? La(function () {
					return b;
			  }, a)
			: La(function () {
					return b;
			  });
	}
	function sc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = O(b);
		return n(function (a, e) {
			Ia()(P(z([a], x(b)), c)).subscribe(e);
		});
	}
	function tc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return sc.apply(void 0, z([], x(b)));
	}
	function Ce(b) {
		return new t(function (a) {
			return b.subscribe(a);
		});
	}
	function Ma(b, a) {
		void 0 === a && (a = De);
		var c = a.connector;
		return n(function (a, e) {
			var d = c();
			q(b(Ce(d))).subscribe(e);
			e.add(a.subscribe(d));
		});
	}
	function uc(b) {
		return ga(function (a, c, d) {
			return !b || b(c, d) ? a + 1 : a;
		}, 0);
	}
	function vc(b) {
		return n(function (a, c) {
			var d = !1,
				e = null,
				f = null,
				h = function () {
					null === f || void 0 === f ? void 0 : f.unsubscribe();
					f = null;
					if (d) {
						d = !1;
						var a = e;
						e = null;
						c.next(a);
					}
				};
			a.subscribe(
				m(
					c,
					function (a) {
						null === f || void 0 === f ? void 0 : f.unsubscribe();
						d = !0;
						e = a;
						f = m(c, h, C);
						q(b(a)).subscribe(f);
					},
					function () {
						h();
						c.complete();
					},
					void 0,
					function () {
						e = f = null;
					}
				)
			);
		});
	}
	function wc(b, a) {
		void 0 === a && (a = I);
		return n(function (c, d) {
			function e() {
				var c = l + b,
					e = a.now();
				e < c ? ((f = this.schedule(void 0, c - e)), d.add(f)) : k();
			}
			var f = null,
				h = null,
				l = null,
				k = function () {
					if (f) {
						f.unsubscribe();
						f = null;
						var a = h;
						h = null;
						d.next(a);
					}
				};
			c.subscribe(
				m(
					d,
					function (c) {
						h = c;
						l = a.now();
						f || ((f = a.schedule(e, b)), d.add(f));
					},
					function () {
						k();
						d.complete();
					},
					void 0,
					function () {
						h = f = null;
					}
				)
			);
		});
	}
	function va(b) {
		return n(function (a, c) {
			var d = !1;
			a.subscribe(
				m(
					c,
					function (a) {
						d = !0;
						c.next(a);
					},
					function () {
						d || c.next(b);
						c.complete();
					}
				)
			);
		});
	}
	function ha(b) {
		return 0 >= b
			? function () {
					return L;
			  }
			: n(function (a, c) {
					var d = 0;
					a.subscribe(
						m(c, function (a) {
							++d <= b && (c.next(a), b <= d && c.complete());
						})
					);
			  });
	}
	function ob() {
		return n(function (b, a) {
			b.subscribe(m(a, C));
		});
	}
	function pb(b) {
		return Q(function () {
			return b;
		});
	}
	function Na(b, a) {
		return a
			? function (c) {
					return ua(a.pipe(ha(1), ob()), c.pipe(Na(b)));
			  }
			: H(function (a, d) {
					return q(b(a, d)).pipe(ha(1), pb(a));
			  });
	}
	function xc(b, a) {
		void 0 === a && (a = I);
		var c = Z(b, a);
		return Na(function () {
			return c;
		});
	}
	function yc() {
		return n(function (b, a) {
			b.subscribe(
				m(a, function (c) {
					return Ga(c, a);
				})
			);
		});
	}
	function zc(b, a) {
		return n(function (c, d) {
			var e = new Set();
			c.subscribe(
				m(d, function (a) {
					var c = b ? b(a) : a;
					e.has(c) || (e.add(c), d.next(a));
				})
			);
			a &&
				q(a).subscribe(
					m(
						d,
						function () {
							return e.clear();
						},
						C
					)
				);
		});
	}
	function qb(b, a) {
		void 0 === a && (a = E);
		b = null !== b && void 0 !== b ? b : Ee;
		return n(function (c, d) {
			var e,
				f = !0;
			c.subscribe(
				m(d, function (c) {
					var h = a(c);
					if (f || !b(e, h)) (f = !1), (e = h), d.next(c);
				})
			);
		});
	}
	function Ee(b, a) {
		return b === a;
	}
	function Ac(b, a) {
		return qb(function (c, d) {
			return a ? a(c[b], d[b]) : c[b] === d[b];
		});
	}
	function wa(b) {
		void 0 === b && (b = Fe);
		return n(function (a, c) {
			var d = !1;
			a.subscribe(
				m(
					c,
					function (a) {
						d = !0;
						c.next(a);
					},
					function () {
						return d ? c.complete() : c.error(b());
					}
				)
			);
		});
	}
	function Fe() {
		return new ba();
	}
	function Bc(b, a) {
		if (0 > b) throw new rb();
		var c = 2 <= arguments.length;
		return function (d) {
			return d.pipe(
				K(function (a, c) {
					return c === b;
				}),
				ha(1),
				c
					? va(a)
					: wa(function () {
							return new rb();
					  })
			);
		};
	}
	function Cc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return function (a) {
			return ua(a, cb.apply(void 0, z([], x(b))));
		};
	}
	function Dc(b, a) {
		return n(function (c, d) {
			var e = 0;
			c.subscribe(
				m(
					d,
					function (f) {
						b.call(a, f, e++, c) || (d.next(!1), d.complete());
					},
					function () {
						d.next(!0);
						d.complete();
					}
				)
			);
		});
	}
	function Oa(b, a) {
		return a
			? function (c) {
					return c.pipe(
						Oa(function (c, e) {
							return q(b(c, e)).pipe(
								Q(function (b, d) {
									return a(c, b, e, d);
								})
							);
						})
					);
			  }
			: n(function (a, d) {
					var c = 0,
						f = null,
						h = !1;
					a.subscribe(
						m(
							d,
							function (a) {
								f ||
									((f = m(d, void 0, function () {
										f = null;
										h && d.complete();
									})),
									q(b(a, c++)).subscribe(f));
							},
							function () {
								h = !0;
								!f && d.complete();
							}
						)
					);
			  });
	}
	function Pa() {
		return Oa(E);
	}
	function Ec(b, a, c) {
		void 0 === a && (a = Infinity);
		a = 1 > (a || 0) ? Infinity : a;
		return n(function (d, e) {
			return gb(d, e, b, a, void 0, !0, c);
		});
	}
	function Fc(b) {
		return n(function (a, c) {
			try {
				a.subscribe(c);
			} finally {
				c.add(b);
			}
		});
	}
	function Gc(b, a) {
		return n(Hc(b, a, 'value'));
	}
	function Hc(b, a, c) {
		var d = 'index' === c;
		return function (c, f) {
			var e = 0;
			c.subscribe(
				m(
					f,
					function (h) {
						var l = e++;
						b.call(a, h, l, c) && (f.next(d ? l : h), f.complete());
					},
					function () {
						f.next(d ? -1 : void 0);
						f.complete();
					}
				)
			);
		};
	}
	function Ic(b, a) {
		return n(Hc(b, a, 'index'));
	}
	function Jc(b, a) {
		var c = 2 <= arguments.length;
		return function (d) {
			return d.pipe(
				b
					? K(function (a, c) {
							return b(a, c, d);
					  })
					: E,
				ha(1),
				c
					? va(a)
					: wa(function () {
							return new ba();
					  })
			);
		};
	}
	function Kc(b, a, c, d) {
		return n(function (e, f) {
			function h(a, c) {
				var b = new t(function (a) {
					v++;
					var b = c.subscribe(a);
					return function () {
						b.unsubscribe();
						0 === --v && n && R.unsubscribe();
					};
				});
				b.key = a;
				return b;
			}
			var l;
			a && 'function' !== typeof a
				? ((c = a.duration), (l = a.element), (d = a.connector))
				: (l = a);
			var k = new Map(),
				g = function (a) {
					k.forEach(a);
					a(f);
				},
				r = function (a) {
					return g(function (c) {
						return c.error(a);
					});
				},
				v = 0,
				n = !1,
				R = new Ya(
					f,
					function (a) {
						try {
							var e = b(a),
								g = k.get(e);
							if (!g) {
								k.set(e, (g = d ? d() : new B()));
								var w = h(e, g);
								f.next(w);
								if (c) {
									var v = m(
										g,
										function () {
											g.complete();
											null === v || void 0 === v ? void 0 : v.unsubscribe();
										},
										void 0,
										void 0,
										function () {
											return k.delete(e);
										}
									);
									R.add(q(c(w)).subscribe(v));
								}
							}
							g.next(l ? l(a) : a);
						} catch (ye) {
							r(ye);
						}
					},
					function () {
						return g(function (a) {
							return a.complete();
						});
					},
					r,
					function () {
						return k.clear();
					},
					function () {
						n = !0;
						return 0 === v;
					}
				);
			e.subscribe(R);
		});
	}
	function Lc() {
		return n(function (b, a) {
			b.subscribe(
				m(
					a,
					function () {
						a.next(!1);
						a.complete();
					},
					function () {
						a.next(!0);
						a.complete();
					}
				)
			);
		});
	}
	function sb(b) {
		return 0 >= b
			? function () {
					return L;
			  }
			: n(function (a, c) {
					var d = [];
					a.subscribe(
						m(
							c,
							function (a) {
								d.push(a);
								b < d.length && d.shift();
							},
							function () {
								var a, b;
								try {
									for (var h = F(d), l = h.next(); !l.done; l = h.next())
										c.next(l.value);
								} catch (k) {
									a = { error: k };
								} finally {
									try {
										l && !l.done && (b = h.return) && b.call(h);
									} finally {
										if (a) throw a.error;
									}
								}
								c.complete();
							},
							void 0,
							function () {
								d = null;
							}
						)
					);
			  });
	}
	function Mc(b, a) {
		var c = 2 <= arguments.length;
		return function (d) {
			return d.pipe(
				b
					? K(function (a, c) {
							return b(a, c, d);
					  })
					: E,
				sb(1),
				c
					? va(a)
					: wa(function () {
							return new ba();
					  })
			);
		};
	}
	function Nc() {
		return n(function (b, a) {
			b.subscribe(
				m(
					a,
					function (c) {
						a.next(Qa.createNext(c));
					},
					function () {
						a.next(Qa.createComplete());
						a.complete();
					},
					function (c) {
						a.next(Qa.createError(c));
						a.complete();
					}
				)
			);
		});
	}
	function Oc(b) {
		return ga(
			p(b)
				? function (a, c) {
						return 0 < b(a, c) ? a : c;
				  }
				: function (a, c) {
						return a > c ? a : c;
				  }
		);
	}
	function Pc(b, a, c) {
		void 0 === c && (c = Infinity);
		if (p(a))
			return H(
				function () {
					return b;
				},
				a,
				c
			);
		'number' === typeof a && (c = a);
		return H(function () {
			return b;
		}, c);
	}
	function Qc(b, a, c) {
		void 0 === c && (c = Infinity);
		return n(function (d, e) {
			var f = a;
			return gb(
				d,
				e,
				function (a, c) {
					return b(f, a, c);
				},
				c,
				function (a) {
					f = a;
				},
				!1,
				void 0,
				function () {
					return (f = null);
				}
			);
		});
	}
	function Rc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = O(b),
			d = 'number' === typeof b[b.length - 1] ? b.pop() : Infinity,
			b = aa(b);
		return n(function (a, f) {
			ta(d)(P(z([a], x(b)), c)).subscribe(f);
		});
	}
	function Sc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return Rc.apply(void 0, z([], x(b)));
	}
	function Tc(b) {
		return ga(
			p(b)
				? function (a, c) {
						return 0 > b(a, c) ? a : c;
				  }
				: function (a, c) {
						return a < c ? a : c;
				  }
		);
	}
	function Ra(b, a) {
		var c = p(b)
			? b
			: function () {
					return b;
			  };
		return p(a)
			? Ma(a, { connector: c })
			: function (a) {
					return new Sa(a, c);
			  };
	}
	function Uc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = aa(b);
		return function (a) {
			return fc.apply(void 0, z([a], x(c)));
		};
	}
	function Vc() {
		return n(function (b, a) {
			var c,
				d = !1;
			b.subscribe(
				m(a, function (b) {
					var e = c;
					c = b;
					d && a.next([e, b]);
					d = !0;
				})
			);
		});
	}
	function Wc() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = b.length;
		if (0 === c) throw Error('list of properties cannot be empty.');
		return Q(function (a) {
			var d = a;
			for (a = 0; a < c; a++)
				if (
					((d = null === d || void 0 === d ? void 0 : d[b[a]]),
					'undefined' === typeof d)
				)
					return;
			return d;
		});
	}
	function Xc(b) {
		return b
			? function (a) {
					return Ma(b)(a);
			  }
			: function (a) {
					return Ra(new B())(a);
			  };
	}
	function Yc(b) {
		return function (a) {
			var c = new Zc(b);
			return new Sa(a, function () {
				return c;
			});
		};
	}
	function $c() {
		return function (b) {
			var a = new fb();
			return new Sa(b, function () {
				return a;
			});
		};
	}
	function ad(b, a, c, d) {
		c && !p(c) && (d = c);
		var e = p(c) ? c : void 0;
		return function (c) {
			return Ra(new ia(b, a, d), e)(c);
		};
	}
	function tb() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return b.length
			? n(function (a, d) {
					hc(z([a], x(b)))(d);
			  })
			: E;
	}
	function bd(b) {
		var a,
			c = Infinity,
			d;
		null != b &&
			('object' === typeof b
				? ((a = b.count), (c = void 0 === a ? Infinity : a), (d = b.delay))
				: (c = b));
		return 0 >= c
			? function () {
					return L;
			  }
			: n(function (a, b) {
					var e = 0,
						f,
						k = function () {
							null === f || void 0 === f ? void 0 : f.unsubscribe();
							f = null;
							if (null != d) {
								var a = 'number' === typeof d ? Z(d) : q(d(e)),
									c = m(b, function () {
										c.unsubscribe();
										g();
									});
								a.subscribe(c);
							} else g();
						},
						g = function () {
							var d = !1;
							f = a.subscribe(
								m(b, void 0, function () {
									++e < c ? (f ? k() : (d = !0)) : b.complete();
								})
							);
							d && k();
						};
					g();
			  });
	}
	function cd(b) {
		return n(function (a, c) {
			var d,
				e = !1,
				f,
				h = !1,
				l = !1,
				k = function () {
					f ||
						((f = new B()),
						q(b(f)).subscribe(
							m(
								c,
								function () {
									d ? g() : (e = !0);
								},
								function () {
									h = !0;
									l && h && c.complete();
								}
							)
						));
					return f;
				},
				g = function () {
					l = !1;
					d = a.subscribe(
						m(c, void 0, function () {
							(((l = !0), h) && (c.complete(), !0)) || k().next();
						})
					);
					e && (d.unsubscribe(), (d = null), (e = !1), g());
				};
			g();
		});
	}
	function dd(b) {
		void 0 === b && (b = Infinity);
		b = b && 'object' === typeof b ? b : { count: b };
		var a = b.count,
			c = void 0 === a ? Infinity : a,
			d = b.delay;
		b = b.resetOnSuccess;
		var e = void 0 === b ? !1 : b;
		return 0 >= c
			? E
			: n(function (a, b) {
					var f = 0,
						h,
						g = function () {
							var l = !1;
							h = a.subscribe(
								m(
									b,
									function (a) {
										e && (f = 0);
										b.next(a);
									},
									void 0,
									function (a) {
										if (f++ < c) {
											var e = function () {
												h ? (h.unsubscribe(), (h = null), g()) : (l = !0);
											};
											if (null != d) {
												a = 'number' === typeof d ? Z(d) : q(d(a, f));
												var k = m(
													b,
													function () {
														k.unsubscribe();
														e();
													},
													function () {
														b.complete();
													}
												);
												a.subscribe(k);
											} else e();
										} else b.error(a);
									}
								)
							);
							l && (h.unsubscribe(), (h = null), g());
						};
					g();
			  });
	}
	function ed(b) {
		return n(function (a, c) {
			var d,
				e = !1,
				f,
				h = function () {
					d = a.subscribe(
						m(c, void 0, void 0, function (a) {
							f ||
								((f = new B()),
								q(b(f)).subscribe(
									m(c, function () {
										return d ? h() : (e = !0);
									})
								));
							f && f.next(a);
						})
					);
					e && (d.unsubscribe(), (d = null), (e = !1), h());
				};
			h();
		});
	}
	function ub(b) {
		return n(function (a, c) {
			var d = !1,
				e = null;
			a.subscribe(
				m(c, function (a) {
					d = !0;
					e = a;
				})
			);
			q(b).subscribe(
				m(
					c,
					function () {
						if (d) {
							d = !1;
							var a = e;
							e = null;
							c.next(a);
						}
					},
					C
				)
			);
		});
	}
	function fd(b, a) {
		void 0 === a && (a = I);
		return ub(ec(b, a));
	}
	function gd(b, a) {
		return n(oc(b, a, 2 <= arguments.length, !0));
	}
	function hd(b, a) {
		void 0 === a &&
			(a = function (a, b) {
				return a === b;
			});
		return n(function (c, d) {
			var e = { buffer: [], complete: !1 },
				f = { buffer: [], complete: !1 },
				h = function (c, b) {
					var e = m(
						d,
						function (e) {
							var f = b.buffer,
								h = b.complete;
							0 === f.length
								? h
									? (d.next(!1), d.complete())
									: c.buffer.push(e)
								: a(e, f.shift()) || (d.next(!1), d.complete());
						},
						function () {
							c.complete = !0;
							var a = b.buffer;
							b.complete && (d.next(0 === a.length), d.complete());
							null === e || void 0 === e ? void 0 : e.unsubscribe();
						}
					);
					return e;
				};
			c.subscribe(h(e, f));
			q(b).subscribe(h(f, e));
		});
	}
	function vb(b) {
		void 0 === b && (b = {});
		var a = b.connector,
			c =
				void 0 === a
					? function () {
							return new B();
					  }
					: a,
			a = b.resetOnError,
			d = void 0 === a ? !0 : a,
			a = b.resetOnComplete,
			e = void 0 === a ? !0 : a;
		b = b.resetOnRefCountZero;
		var f = void 0 === b ? !0 : b;
		return function (a) {
			var b,
				h,
				g,
				r = 0,
				v = !1,
				m = !1,
				R = function () {
					null === h || void 0 === h ? void 0 : h.unsubscribe();
					h = void 0;
				},
				u = function () {
					R();
					b = g = void 0;
					v = m = !1;
				},
				fa = function () {
					var a = b;
					u();
					null === a || void 0 === a ? void 0 : a.unsubscribe();
				};
			return n(function (a, l) {
				r++;
				m || v || R();
				var k = (g = null !== g && void 0 !== g ? g : c());
				l.add(function () {
					r--;
					0 !== r || m || v || (h = wb(fa, f));
				});
				k.subscribe(l);
				!b &&
					0 < r &&
					((b = new ja({
						next: function (a) {
							return k.next(a);
						},
						error: function (a) {
							m = !0;
							R();
							h = wb(u, d, a);
							k.error(a);
						},
						complete: function () {
							v = !0;
							R();
							h = wb(u, e);
							k.complete();
						}
					})),
					q(a).subscribe(b));
			})(a);
		};
	}
	function wb(b, a) {
		for (var c = [], d = 2; d < arguments.length; d++) c[d - 2] = arguments[d];
		if (!0 === a) b();
		else if (!1 !== a) {
			var e = new ja({
				next: function () {
					e.unsubscribe();
					b();
				}
			});
			return q(a.apply(void 0, z([], x(c)))).subscribe(e);
		}
	}
	function id(b, a, c) {
		var d, e;
		d = !1;
		b && 'object' === typeof b
			? ((d = b.bufferSize),
			  (e = void 0 === d ? Infinity : d),
			  (d = b.windowTime),
			  (a = void 0 === d ? Infinity : d),
			  (d = b.refCount),
			  (d = void 0 === d ? !1 : d),
			  (c = b.scheduler))
			: (e = null !== b && void 0 !== b ? b : Infinity);
		return vb({
			connector: function () {
				return new ia(e, a, c);
			},
			resetOnError: !0,
			resetOnComplete: !1,
			resetOnRefCountZero: d
		});
	}
	function jd(b) {
		return n(function (a, c) {
			var d = !1,
				e,
				f = !1,
				h = 0;
			a.subscribe(
				m(
					c,
					function (l) {
						f = !0;
						if (!b || b(l, h++, a))
							d && c.error(new kd('Too many matching values')),
								(d = !0),
								(e = l);
					},
					function () {
						d
							? (c.next(e), c.complete())
							: c.error(f ? new ld('No matching values') : new ba());
					}
				)
			);
		});
	}
	function md(b) {
		return K(function (a, c) {
			return b <= c;
		});
	}
	function nd(b) {
		return 0 >= b
			? E
			: n(function (a, c) {
					var d = Array(b),
						e = 0;
					a.subscribe(
						m(c, function (a) {
							var f = e++;
							if (f < b) d[f] = a;
							else {
								var f = f % b,
									l = d[f];
								d[f] = a;
								c.next(l);
							}
						})
					);
					return function () {
						d = null;
					};
			  });
	}
	function od(b) {
		return n(function (a, c) {
			var d = !1,
				e = m(
					c,
					function () {
						null === e || void 0 === e ? void 0 : e.unsubscribe();
						d = !0;
					},
					C
				);
			q(b).subscribe(e);
			a.subscribe(
				m(c, function (a) {
					return d && c.next(a);
				})
			);
		});
	}
	function pd(b) {
		return n(function (a, c) {
			var d = !1,
				e = 0;
			a.subscribe(
				m(c, function (a) {
					return (d || (d = !b(a, e++))) && c.next(a);
				})
			);
		});
	}
	function qd() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = O(b);
		return n(function (a, e) {
			(c ? ua(b, a, c) : ua(b, a)).subscribe(e);
		});
	}
	function ka(b, a) {
		return n(function (c, d) {
			var e = null,
				f = 0,
				h = !1;
			c.subscribe(
				m(
					d,
					function (c) {
						null === e || void 0 === e ? void 0 : e.unsubscribe();
						var l = 0,
							g = f++;
						q(b(c, g)).subscribe(
							(e = m(
								d,
								function (b) {
									return d.next(a ? a(c, b, g, l++) : b);
								},
								function () {
									e = null;
									h && !e && d.complete();
								}
							))
						);
					},
					function () {
						((h = !0), !e) && d.complete();
					}
				)
			);
		});
	}
	function rd() {
		return ka(E);
	}
	function sd(b, a) {
		return p(a)
			? ka(function () {
					return b;
			  }, a)
			: ka(function () {
					return b;
			  });
	}
	function td(b, a) {
		return n(function (c, d) {
			var e = a;
			ka(
				function (a, c) {
					return b(e, a, c);
				},
				function (a, c) {
					return (e = c), c;
				}
			)(c).subscribe(d);
			return function () {
				e = null;
			};
		});
	}
	function ud(b) {
		return n(function (a, c) {
			q(b).subscribe(
				m(
					c,
					function () {
						return c.complete();
					},
					C
				)
			);
			!c.closed && a.subscribe(c);
		});
	}
	function vd(b, a) {
		void 0 === a && (a = !1);
		return n(function (c, d) {
			var e = 0;
			c.subscribe(
				m(d, function (c) {
					var f = b(c, e++);
					(f || a) && d.next(c);
					!f && d.complete();
				})
			);
		});
	}
	function wd(b, a, c) {
		var d = p(b) || a || c ? { next: b, error: a, complete: c } : b;
		return d
			? n(function (a, c) {
					var b;
					null === (b = d.subscribe) || void 0 === b ? void 0 : b.call(d);
					var e = !0;
					a.subscribe(
						m(
							c,
							function (a) {
								var b;
								null === (b = d.next) || void 0 === b ? void 0 : b.call(d, a);
								c.next(a);
							},
							function () {
								var a;
								e = !1;
								null === (a = d.complete) || void 0 === a ? void 0 : a.call(d);
								c.complete();
							},
							function (a) {
								var b;
								e = !1;
								null === (b = d.error) || void 0 === b ? void 0 : b.call(d, a);
								c.error(a);
							},
							function () {
								var a, c;
								e &&
									(null === (a = d.unsubscribe) || void 0 === a
										? void 0
										: a.call(d));
								null === (c = d.finalize) || void 0 === c ? void 0 : c.call(d);
							}
						)
					);
			  })
			: E;
	}
	function xb(b, a) {
		void 0 === a && (a = xd);
		return n(function (c, d) {
			var e = a.leading,
				f = a.trailing,
				h = !1,
				l = null,
				g = null,
				w = !1,
				r = function () {
					null === g || void 0 === g ? void 0 : g.unsubscribe();
					g = null;
					f && (n(), w && d.complete());
				},
				v = function () {
					g = null;
					w && d.complete();
				},
				n = function () {
					if (h) {
						h = !1;
						var a = l;
						l = null;
						d.next(a);
						!w && (g = q(b(a)).subscribe(m(d, r, v)));
					}
				};
			c.subscribe(
				m(
					d,
					function (a) {
						h = !0;
						l = a;
						(!g || g.closed) && (e ? n() : (g = q(b(a)).subscribe(m(d, r, v))));
					},
					function () {
						w = !0;
						(f && h && g && !g.closed) || d.complete();
					}
				)
			);
		});
	}
	function yd(b, a, c) {
		void 0 === a && (a = I);
		void 0 === c && (c = xd);
		var d = Z(b, a);
		return xb(function () {
			return d;
		}, c);
	}
	function zd(b) {
		void 0 === b && (b = I);
		return n(function (a, c) {
			var d = b.now();
			a.subscribe(
				m(c, function (a) {
					var e = b.now(),
						h = e - d;
					d = e;
					c.next(new Ge(a, h));
				})
			);
		});
	}
	function Ad(b, a, c) {
		var d, e;
		c = null !== c && void 0 !== c ? c : ib;
		db(b) ? (d = b) : 'number' === typeof b && (e = b);
		if (a)
			b = function () {
				return a;
			};
		else throw new TypeError('No observable provided to switch to');
		if (null == d && null == e) throw new TypeError('No timeout provided.');
		return eb({ first: d, each: e, scheduler: c, with: b });
	}
	function Bd(b) {
		void 0 === b && (b = la);
		return Q(function (a) {
			return { value: a, timestamp: b.now() };
		});
	}
	function Cd(b) {
		return n(function (a, c) {
			var d = new B();
			c.next(d.asObservable());
			var e = function (a) {
				d.error(a);
				c.error(a);
			};
			a.subscribe(
				m(
					c,
					function (a) {
						return null === d || void 0 === d ? void 0 : d.next(a);
					},
					function () {
						d.complete();
						c.complete();
					},
					e
				)
			);
			q(b).subscribe(
				m(
					c,
					function () {
						d.complete();
						c.next((d = new B()));
					},
					C,
					e
				)
			);
			return function () {
				null === d || void 0 === d ? void 0 : d.unsubscribe();
				d = null;
			};
		});
	}
	function Dd(b, a) {
		void 0 === a && (a = 0);
		var c = 0 < a ? a : b;
		return n(function (a, e) {
			var d = [new B()],
				h = 0;
			e.next(d[0].asObservable());
			a.subscribe(
				m(
					e,
					function (a) {
						var f, g;
						try {
							for (var l = F(d), v = l.next(); !v.done; v = l.next())
								v.value.next(a);
						} catch (A) {
							f = { error: A };
						} finally {
							try {
								v && !v.done && (g = l.return) && g.call(l);
							} finally {
								if (f) throw f.error;
							}
						}
						a = h - b + 1;
						0 <= a && 0 === a % c && d.shift().complete();
						0 === ++h % c &&
							((a = new B()), d.push(a), e.next(a.asObservable()));
					},
					function () {
						for (; 0 < d.length; ) d.shift().complete();
						e.complete();
					},
					function (a) {
						for (; 0 < d.length; ) d.shift().error(a);
						e.error(a);
					},
					function () {
						d = null;
					}
				)
			);
		});
	}
	function Ed(b) {
		for (var a, c, d = [], e = 1; e < arguments.length; e++)
			d[e - 1] = arguments[e];
		var f = null !== (a = O(d)) && void 0 !== a ? a : I,
			h = null !== (c = d[0]) && void 0 !== c ? c : null,
			g = d[1] || Infinity;
		return n(function (a, c) {
			var d = [],
				e = !1,
				l = function (a) {
					var c = a.subs;
					a.window.complete();
					c.unsubscribe();
					M(d, a);
					e && k();
				},
				k = function () {
					if (d) {
						var a = new D();
						c.add(a);
						var e = new B(),
							h = { window: e, subs: a, seen: 0 };
						d.push(h);
						c.next(e.asObservable());
						G(
							a,
							f,
							function () {
								return l(h);
							},
							b
						);
					}
				};
			null !== h && 0 <= h ? G(c, f, k, h, !0) : (e = !0);
			k();
			var w = function (a) {
				d.slice().forEach(function (c) {
					return a(c.window);
				});
				a(c);
				c.unsubscribe();
			};
			a.subscribe(
				m(
					c,
					function (a) {
						d.slice().forEach(function (c) {
							c.window.next(a);
							g <= ++c.seen && l(c);
						});
					},
					function () {
						return w(function (a) {
							return a.complete();
						});
					},
					function (a) {
						return w(function (c) {
							return c.error(a);
						});
					}
				)
			);
			return function () {
				d = null;
			};
		});
	}
	function Fd(b, a) {
		return n(function (c, d) {
			var e = [],
				f = function (a) {
					for (; 0 < e.length; ) e.shift().error(a);
					d.error(a);
				};
			q(b).subscribe(
				m(
					d,
					function (c) {
						var b = new B();
						e.push(b);
						var h = new D(),
							g;
						try {
							g = q(a(c));
						} catch (r) {
							f(r);
							return;
						}
						d.next(b.asObservable());
						h.add(
							g.subscribe(
								m(
									d,
									function () {
										M(e, b);
										b.complete();
										h.unsubscribe();
									},
									C,
									f
								)
							)
						);
					},
					C
				)
			);
			c.subscribe(
				m(
					d,
					function (a) {
						var c,
							b,
							d = e.slice();
						try {
							for (var f = F(d), h = f.next(); !h.done; h = f.next())
								h.value.next(a);
						} catch (A) {
							c = { error: A };
						} finally {
							try {
								h && !h.done && (b = f.return) && b.call(f);
							} finally {
								if (c) throw c.error;
							}
						}
					},
					function () {
						for (; 0 < e.length; ) e.shift().complete();
						d.complete();
					},
					f,
					function () {
						for (; 0 < e.length; ) e.shift().unsubscribe();
					}
				)
			);
		});
	}
	function Gd(b) {
		return n(function (a, c) {
			var d,
				e,
				f = function (a) {
					d.error(a);
					c.error(a);
				},
				h = function () {
					null === e || void 0 === e ? void 0 : e.unsubscribe();
					null === d || void 0 === d ? void 0 : d.complete();
					d = new B();
					c.next(d.asObservable());
					var a;
					try {
						a = q(b());
					} catch (k) {
						f(k);
						return;
					}
					a.subscribe((e = m(c, h, h, f)));
				};
			h();
			a.subscribe(
				m(
					c,
					function (a) {
						return d.next(a);
					},
					function () {
						d.complete();
						c.complete();
					},
					f,
					function () {
						null === e || void 0 === e ? void 0 : e.unsubscribe();
						d = null;
					}
				)
			);
		});
	}
	function Hd() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var c = pa(b);
		return n(function (a, e) {
			for (
				var d = b.length,
					h = Array(d),
					g = b.map(function () {
						return !1;
					}),
					k = !1,
					n = function (a) {
						q(b[a]).subscribe(
							m(
								e,
								function (c) {
									h[a] = c;
									k || g[a] || ((g[a] = !0), (k = g.every(E)) && (g = null));
								},
								C
							)
						);
					},
					r = 0;
				r < d;
				r++
			)
				n(r);
			a.subscribe(
				m(e, function (a) {
					k &&
						((a = z([a], x(h))), e.next(c ? c.apply(void 0, z([], x(a))) : a));
				})
			);
		});
	}
	function Id(b) {
		return pc(jb, b);
	}
	function Jd() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return n(function (a, d) {
			jb.apply(void 0, z([a], x(b))).subscribe(d);
		});
	}
	function Kd() {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		return Jd.apply(void 0, z([], x(b)));
	}
	function Ld(b, a) {
		for (var c = 0, d = a.length; c < d; c++)
			for (
				var e = a[c],
					f = Object.getOwnPropertyNames(e.prototype),
					h = 0,
					g = f.length;
				h < g;
				h++
			) {
				var k = f[h];
				b.prototype[k] = e.prototype[k];
			}
	}
	function Md(b) {
		switch (b.responseType) {
			case 'json':
				return 'response' in b ? b.response : JSON.parse(b.responseText);
			case 'document':
				return b.responseXML;
			default:
				return 'response' in b ? b.response : b.responseText;
		}
	}
	function He(b, a) {
		return ca({ method: 'GET', url: b, headers: a });
	}
	function Ie(b, a, c) {
		return ca({ method: 'POST', url: b, body: a, headers: c });
	}
	function Je(b, a) {
		return ca({ method: 'DELETE', url: b, headers: a });
	}
	function Ke(b, a, c) {
		return ca({ method: 'PUT', url: b, body: a, headers: c });
	}
	function Le(b, a, c) {
		return ca({ method: 'PATCH', url: b, body: a, headers: c });
	}
	function Me(b, a) {
		return Ne(ca({ method: 'GET', url: b, headers: a }));
	}
	function Oe(b) {
		return new t(function (a) {
			var c,
				d,
				e = U(
					{
						async: !0,
						crossDomain: !1,
						withCredentials: !1,
						method: 'GET',
						timeout: 0,
						responseType: 'json'
					},
					b
				),
				f = e.queryParams,
				h = e.body,
				g = e.headers,
				k = e.url;
			if (!k) throw new TypeError('url is required');
			if (f) {
				var m;
				if (k.includes('?')) {
					k = k.split('?');
					if (2 < k.length) throw new TypeError('invalid url');
					m = new URLSearchParams(k[1]);
					new URLSearchParams(f).forEach(function (a, c) {
						return m.set(c, a);
					});
					k = k[0] + '?' + m;
				} else (m = new URLSearchParams(f)), (k = k + '?' + m);
			}
			f = {};
			if (g)
				for (var r in g) g.hasOwnProperty(r) && (f[r.toLowerCase()] = g[r]);
			var n = e.crossDomain;
			n ||
				'x-requested-with' in f ||
				(f['x-requested-with'] = 'XMLHttpRequest');
			var A = e.xsrfCookieName,
				g = e.xsrfHeaderName;
			(e.withCredentials || !n) &&
				A &&
				g &&
				(n =
					null !==
						(d =
							null ===
								(c =
									null === document || void 0 === document
										? void 0
										: document.cookie.match(
												new RegExp('(^|;\\s*)(' + A + ')\x3d([^;]*)')
										  )) || void 0 === c
								? void 0
								: c.pop()) && void 0 !== d
						? d
						: '') &&
				(f[g] = n);
			c = Pe(h, f);
			var q = U(U({}, e), { url: k, headers: f, body: c }),
				u;
			u = b.createXHR ? b.createXHR() : new XMLHttpRequest();
			var p = b.progressSubscriber,
				e = b.includeDownloadProgress,
				e = void 0 === e ? !1 : e;
			d = b.includeUploadProgress;
			d = void 0 === d ? !1 : d;
			h = function (c, b) {
				u.addEventListener(c, function () {
					var c,
						d = b();
					null === (c = null === p || void 0 === p ? void 0 : p.error) ||
					void 0 === c
						? void 0
						: c.call(p, d);
					a.error(d);
				});
			};
			h('timeout', function () {
				return new Nd(u, q);
			});
			h('abort', function () {
				return new xa('aborted', u, q);
			});
			var t = function (c, b, d) {
				c.addEventListener(b, function (c) {
					a.next(new yb(c, u, q, d + '_' + c.type));
				});
			};
			d &&
				[zb, Ab, Od].forEach(function (a) {
					return t(u.upload, a, Qe);
				});
			p &&
				[zb, Ab].forEach(function (a) {
					return u.upload.addEventListener(a, function (a) {
						var c;
						return null ===
							(c = null === p || void 0 === p ? void 0 : p.next) || void 0 === c
							? void 0
							: c.call(p, a);
					});
				});
			e &&
				[zb, Ab].forEach(function (a) {
					return t(u, a, Pd);
				});
			var x = function (c) {
				a.error(new xa('ajax error' + (c ? ' ' + c : ''), u, q));
			};
			u.addEventListener('error', function (a) {
				var c;
				null === (c = null === p || void 0 === p ? void 0 : p.error) ||
				void 0 === c
					? void 0
					: c.call(p, a);
				x();
			});
			u.addEventListener(Od, function (c) {
				var b,
					d,
					e = u.status;
				if (400 > e) {
					null === (b = null === p || void 0 === p ? void 0 : p.complete) ||
					void 0 === b
						? void 0
						: b.call(p);
					b = void 0;
					try {
						b = new yb(c, u, q, Pd + '_' + c.type);
					} catch (ze) {
						a.error(ze);
						return;
					}
					a.next(b);
					a.complete();
				} else null === (d = null === p || void 0 === p ? void 0 : p.error) || void 0 === d ? void 0 : d.call(p, c), x(e);
			});
			e = q.user;
			d = q.method;
			h = q.async;
			e ? u.open(d, k, h, e, q.password) : u.open(d, k, h);
			h && ((u.timeout = q.timeout), (u.responseType = q.responseType));
			'withCredentials' in u && (u.withCredentials = q.withCredentials);
			for (r in f) f.hasOwnProperty(r) && u.setRequestHeader(r, f[r]);
			c ? u.send(c) : u.send();
			return function () {
				u && 4 !== u.readyState && u.abort();
			};
		});
	}
	function Pe(b, a) {
		var c;
		if (
			!b ||
			'string' === typeof b ||
			('undefined' !== typeof FormData && b instanceof FormData) ||
			('undefined' !== typeof URLSearchParams &&
				b instanceof URLSearchParams) ||
			Bb(b, 'ArrayBuffer') ||
			Bb(b, 'File') ||
			Bb(b, 'Blob') ||
			('undefined' !== typeof ReadableStream && b instanceof ReadableStream)
		)
			return b;
		if ('undefined' !== typeof ArrayBuffer && ArrayBuffer.isView(b))
			return b.buffer;
		if ('object' === typeof b)
			return (
				(a['content-type'] =
					null !== (c = a['content-type']) && void 0 !== c
						? c
						: 'application/json;charset\x3dutf-8'),
				JSON.stringify(b)
			);
		throw new TypeError('Unknown body type');
	}
	function Bb(b, a) {
		return Re.call(b) === '[object ' + a + ']';
	}
	var Ua = function (b, a) {
			Ua =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (a, b) {
						a.__proto__ = b;
					}) ||
				function (a, b) {
					for (var c in b)
						Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
				};
			return Ua(b, a);
		},
		U = function () {
			U =
				Object.assign ||
				function (b) {
					for (var a, c = 1, d = arguments.length; c < d; c++) {
						a = arguments[c];
						for (var e in a)
							Object.prototype.hasOwnProperty.call(a, e) && (b[e] = a[e]);
					}
					return b;
				};
			return U.apply(this, arguments);
		},
		Ta = S(function (b) {
			return function (a) {
				b(this);
				this.message = a
					? a.length +
					  ' errors occurred during unsubscription:\n' +
					  a
							.map(function (a, b) {
								return b + 1 + ') ' + a.toString();
							})
							.join('\n  ')
					: '';
				this.name = 'UnsubscriptionError';
				this.errors = a;
			};
		}),
		D = (function () {
			function b(a) {
				this.initialTeardown = a;
				this.closed = !1;
				this._finalizers = this._parentage = null;
			}
			b.prototype.unsubscribe = function () {
				var a, c, b, e, f;
				if (!this.closed) {
					this.closed = !0;
					var h = this._parentage;
					if (h)
						if (((this._parentage = null), Array.isArray(h)))
							try {
								for (var g = F(h), k = g.next(); !k.done; k = g.next())
									k.value.remove(this);
							} catch (A) {
								a = { error: A };
							} finally {
								try {
									k && !k.done && (c = g.return) && c.call(g);
								} finally {
									if (a) throw a.error;
								}
							}
						else h.remove(this);
					a = this.initialTeardown;
					if (p(a))
						try {
							a();
						} catch (A) {
							f = A instanceof Ta ? A.errors : [A];
						}
					if ((a = this._finalizers)) {
						this._finalizers = null;
						try {
							for (var m = F(a), r = m.next(); !r.done; r = m.next()) {
								var n = r.value;
								try {
									(a = n), p(a) ? a() : a.unsubscribe();
								} catch (A) {
									(f = null !== f && void 0 !== f ? f : []),
										A instanceof Ta
											? (f = z(z([], x(f)), x(A.errors)))
											: f.push(A);
								}
							}
						} catch (A) {
							b = { error: A };
						} finally {
							try {
								r && !r.done && (e = m.return) && e.call(m);
							} finally {
								if (b) throw b.error;
							}
						}
					}
					if (f) throw new Ta(f);
				}
			};
			b.prototype.add = function (a) {
				var c;
				if (a && a !== this)
					if (this.closed) p(a) ? a() : a.unsubscribe();
					else {
						if (a instanceof b) {
							if (a.closed || a._hasParent(this)) return;
							a._addParent(this);
						}
						(this._finalizers =
							null !== (c = this._finalizers) && void 0 !== c ? c : []).push(a);
					}
			};
			b.prototype._hasParent = function (a) {
				var c = this._parentage;
				return c === a || (Array.isArray(c) && c.includes(a));
			};
			b.prototype._addParent = function (a) {
				var c = this._parentage;
				this._parentage = Array.isArray(c) ? (c.push(a), c) : c ? [c, a] : a;
			};
			b.prototype._removeParent = function (a) {
				var c = this._parentage;
				c === a ? (this._parentage = null) : Array.isArray(c) && M(c, a);
			};
			b.prototype.remove = function (a) {
				var c = this._finalizers;
				c && M(c, a);
				a instanceof b && a._removeParent(this);
			};
			b.EMPTY = (function () {
				var a = new b();
				a.closed = !0;
				return a;
			})();
			return b;
		})(),
		Qd = D.EMPTY,
		T = {
			onUnhandledError: null,
			onStoppedNotification: null,
			Promise: void 0,
			useDeprecatedSynchronousErrorHandling: !1,
			useDeprecatedNextContext: !1
		},
		ea = {
			setTimeout: function (b, a) {
				for (var c = [], d = 2; d < arguments.length; d++)
					c[d - 2] = arguments[d];
				d = ea.delegate;
				return (null === d || void 0 === d ? 0 : d.setTimeout)
					? d.setTimeout.apply(d, z([b, a], x(c)))
					: setTimeout.apply(void 0, z([b, a], x(c)));
			},
			clearTimeout: function (b) {
				var a = ea.delegate;
				return (
					(null === a || void 0 === a ? void 0 : a.clearTimeout) || clearTimeout
				)(b);
			},
			delegate: void 0
		},
		ya = J('C', void 0, void 0),
		V = null,
		oa = (function (b) {
			function a(a) {
				var c = b.call(this) || this;
				c.isStopped = !1;
				a ? ((c.destination = a), Ib(a) && a.add(c)) : (c.destination = Se);
				return c;
			}
			y(a, b);
			a.create = function (a, b, e) {
				return new ja(a, b, e);
			};
			a.prototype.next = function (a) {
				this.isStopped ? Wa(J('N', a, void 0), this) : this._next(a);
			};
			a.prototype.error = function (a) {
				this.isStopped
					? Wa(J('E', void 0, a), this)
					: ((this.isStopped = !0), this._error(a));
			};
			a.prototype.complete = function () {
				this.isStopped
					? Wa(ya, this)
					: ((this.isStopped = !0), this._complete());
			};
			a.prototype.unsubscribe = function () {
				this.closed ||
					((this.isStopped = !0),
					b.prototype.unsubscribe.call(this),
					(this.destination = null));
			};
			a.prototype._next = function (a) {
				this.destination.next(a);
			};
			a.prototype._error = function (a) {
				try {
					this.destination.error(a);
				} finally {
					this.unsubscribe();
				}
			};
			a.prototype._complete = function () {
				try {
					this.destination.complete();
				} finally {
					this.unsubscribe();
				}
			};
			return a;
		})(D),
		Cb = Function.prototype.bind,
		Te = (function () {
			function b(a) {
				this.partialObserver = a;
			}
			b.prototype.next = function (a) {
				var c = this.partialObserver;
				if (c.next)
					try {
						c.next(a);
					} catch (d) {
						Da(d);
					}
			};
			b.prototype.error = function (a) {
				var c = this.partialObserver;
				if (c.error)
					try {
						c.error(a);
					} catch (d) {
						Da(d);
					}
				else Da(a);
			};
			b.prototype.complete = function () {
				var a = this.partialObserver;
				if (a.complete)
					try {
						a.complete();
					} catch (c) {
						Da(c);
					}
			};
			return b;
		})(),
		ja = (function (b) {
			function a(a, d, e) {
				var c = b.call(this) || this;
				p(a) || !a
					? (a = {
							next: null !== a && void 0 !== a ? a : void 0,
							error: null !== d && void 0 !== d ? d : void 0,
							complete: null !== e && void 0 !== e ? e : void 0
					  })
					: c &&
					  T.useDeprecatedNextContext &&
					  ((d = Object.create(a)),
					  (d.unsubscribe = function () {
							return c.unsubscribe();
					  }),
					  (a = {
							next: a.next && Cb.call(a.next, d),
							error: a.error && Cb.call(a.error, d),
							complete: a.complete && Cb.call(a.complete, d)
					  }));
				c.destination = new Te(a);
				return c;
			}
			y(a, b);
			return a;
		})(oa),
		Se = {
			closed: !0,
			next: C,
			error: function (b) {
				throw b;
			},
			complete: C
		},
		qa = ('function' === typeof Symbol && Symbol.observable) || '@@observable',
		t = (function () {
			function b(a) {
				a && (this._subscribe = a);
			}
			b.prototype.lift = function (a) {
				var c = new b();
				c.source = this;
				c.operator = a;
				return c;
			};
			b.prototype.subscribe = function (a, c, b) {
				var d = this,
					f = de(a) ? a : new ja(a, c, b);
				Ca(function () {
					var a = d.operator,
						c = d.source;
					f.add(a ? a.call(f, c) : c ? d._subscribe(f) : d._trySubscribe(f));
				});
				return f;
			};
			b.prototype._trySubscribe = function (a) {
				try {
					return this._subscribe(a);
				} catch (c) {
					a.error(c);
				}
			};
			b.prototype.forEach = function (a, c) {
				var b = this;
				c = Lb(c);
				return new c(function (c, d) {
					var e = new ja({
						next: function (c) {
							try {
								a(c);
							} catch (k) {
								d(k), e.unsubscribe();
							}
						},
						error: d,
						complete: c
					});
					b.subscribe(e);
				});
			};
			b.prototype._subscribe = function (a) {
				var c;
				return null === (c = this.source) || void 0 === c
					? void 0
					: c.subscribe(a);
			};
			b.prototype[qa] = function () {
				return this;
			};
			b.prototype.pipe = function () {
				for (var a = [], c = 0; c < arguments.length; c++) a[c] = arguments[c];
				return Kb(a)(this);
			};
			b.prototype.toPromise = function (a) {
				var c = this;
				a = Lb(a);
				return new a(function (a, b) {
					var d;
					c.subscribe(
						function (a) {
							return (d = a);
						},
						function (a) {
							return b(a);
						},
						function () {
							return a(d);
						}
					);
				});
			};
			b.create = function (a) {
				return new b(a);
			};
			return b;
		})(),
		Ya = (function (b) {
			function a(a, d, e, f, h, g) {
				var c = b.call(this, a) || this;
				c.onFinalize = h;
				c.shouldUnsubscribe = g;
				c._next = d
					? function (c) {
							try {
								d(c);
							} catch (r) {
								a.error(r);
							}
					  }
					: b.prototype._next;
				c._error = f
					? function (c) {
							try {
								f(c);
							} catch (r) {
								a.error(r);
							} finally {
								this.unsubscribe();
							}
					  }
					: b.prototype._error;
				c._complete = e
					? function () {
							try {
								e();
							} catch (w) {
								a.error(w);
							} finally {
								this.unsubscribe();
							}
					  }
					: b.prototype._complete;
				return c;
			}
			y(a, b);
			a.prototype.unsubscribe = function () {
				var a;
				if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
					var d = this.closed;
					b.prototype.unsubscribe.call(this);
					!d &&
						(null === (a = this.onFinalize) || void 0 === a
							? void 0
							: a.call(this));
				}
			};
			return a;
		})(oa),
		Sa = (function (b) {
			function a(a, d) {
				var c = b.call(this) || this;
				c.source = a;
				c.subjectFactory = d;
				c._subject = null;
				c._refCount = 0;
				c._connection = null;
				p(null === a || void 0 === a ? void 0 : a.lift) && (c.lift = a.lift);
				return c;
			}
			y(a, b);
			a.prototype._subscribe = function (a) {
				return this.getSubject().subscribe(a);
			};
			a.prototype.getSubject = function () {
				var a = this._subject;
				if (!a || a.isStopped) this._subject = this.subjectFactory();
				return this._subject;
			};
			a.prototype._teardown = function () {
				this._refCount = 0;
				var a = this._connection;
				this._subject = this._connection = null;
				null === a || void 0 === a ? void 0 : a.unsubscribe();
			};
			a.prototype.connect = function () {
				var a = this,
					b = this._connection;
				if (!b) {
					var b = (this._connection = new D()),
						e = this.getSubject();
					b.add(
						this.source.subscribe(
							m(
								e,
								void 0,
								function () {
									a._teardown();
									e.complete();
								},
								function (b) {
									a._teardown();
									e.error(b);
								},
								function () {
									return a._teardown();
								}
							)
						)
					);
					b.closed && ((this._connection = null), (b = D.EMPTY));
				}
				return b;
			};
			a.prototype.refCount = function () {
				return Za()(this);
			};
			return a;
		})(t),
		Ea = {
			now: function () {
				return (Ea.delegate || performance).now();
			},
			delegate: void 0
		},
		N = {
			schedule: function (b) {
				var a = requestAnimationFrame,
					c = cancelAnimationFrame,
					d = N.delegate;
				d && ((a = d.requestAnimationFrame), (c = d.cancelAnimationFrame));
				var e = a(function (a) {
					c = void 0;
					b(a);
				});
				return new D(function () {
					return null === c || void 0 === c ? void 0 : c(e);
				});
			},
			requestAnimationFrame: function () {
				for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
				a = N.delegate;
				return (
					(null === a || void 0 === a ? void 0 : a.requestAnimationFrame) ||
					requestAnimationFrame
				).apply(void 0, z([], x(b)));
			},
			cancelAnimationFrame: function () {
				for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
				a = N.delegate;
				return (
					(null === a || void 0 === a ? void 0 : a.cancelAnimationFrame) ||
					cancelAnimationFrame
				).apply(void 0, z([], x(b)));
			},
			delegate: void 0
		},
		Ue = Mb(),
		Rd = S(function (b) {
			return function () {
				b(this);
				this.name = 'ObjectUnsubscribedError';
				this.message = 'object unsubscribed';
			};
		}),
		B = (function (b) {
			function a() {
				var a = b.call(this) || this;
				a.closed = !1;
				a.currentObservers = null;
				a.observers = [];
				a.isStopped = !1;
				a.hasError = !1;
				a.thrownError = null;
				return a;
			}
			y(a, b);
			a.prototype.lift = function (a) {
				var b = new Db(this, this);
				b.operator = a;
				return b;
			};
			a.prototype._throwIfClosed = function () {
				if (this.closed) throw new Rd();
			};
			a.prototype.next = function (a) {
				var b = this;
				Ca(function () {
					var c, d;
					b._throwIfClosed();
					if (!b.isStopped) {
						b.currentObservers ||
							(b.currentObservers = Array.from(b.observers));
						try {
							for (
								var h = F(b.currentObservers), g = h.next();
								!g.done;
								g = h.next()
							)
								g.value.next(a);
						} catch (k) {
							c = { error: k };
						} finally {
							try {
								g && !g.done && (d = h.return) && d.call(h);
							} finally {
								if (c) throw c.error;
							}
						}
					}
				});
			};
			a.prototype.error = function (a) {
				var b = this;
				Ca(function () {
					b._throwIfClosed();
					if (!b.isStopped) {
						b.hasError = b.isStopped = !0;
						b.thrownError = a;
						for (var c = b.observers; c.length; ) c.shift().error(a);
					}
				});
			};
			a.prototype.complete = function () {
				var a = this;
				Ca(function () {
					a._throwIfClosed();
					if (!a.isStopped) {
						a.isStopped = !0;
						for (var b = a.observers; b.length; ) b.shift().complete();
					}
				});
			};
			a.prototype.unsubscribe = function () {
				this.isStopped = this.closed = !0;
				this.observers = this.currentObservers = null;
			};
			Object.defineProperty(a.prototype, 'observed', {
				get: function () {
					var a;
					return (
						0 <
						(null === (a = this.observers) || void 0 === a ? void 0 : a.length)
					);
				},
				enumerable: !1,
				configurable: !0
			});
			a.prototype._trySubscribe = function (a) {
				this._throwIfClosed();
				return b.prototype._trySubscribe.call(this, a);
			};
			a.prototype._subscribe = function (a) {
				this._throwIfClosed();
				this._checkFinalizedStatuses(a);
				return this._innerSubscribe(a);
			};
			a.prototype._innerSubscribe = function (a) {
				var b = this,
					c = this.isStopped,
					f = this.observers;
				if (this.hasError || c) return Qd;
				this.currentObservers = null;
				f.push(a);
				return new D(function () {
					b.currentObservers = null;
					M(f, a);
				});
			};
			a.prototype._checkFinalizedStatuses = function (a) {
				var b = this.thrownError,
					c = this.isStopped;
				this.hasError ? a.error(b) : c && a.complete();
			};
			a.prototype.asObservable = function () {
				var a = new t();
				a.source = this;
				return a;
			};
			a.create = function (a, b) {
				return new Db(a, b);
			};
			return a;
		})(t),
		Db = (function (b) {
			function a(a, d) {
				var c = b.call(this) || this;
				c.destination = a;
				c.source = d;
				return c;
			}
			y(a, b);
			a.prototype.next = function (a) {
				var b, c;
				null ===
					(c =
						null === (b = this.destination) || void 0 === b
							? void 0
							: b.next) || void 0 === c
					? void 0
					: c.call(b, a);
			};
			a.prototype.error = function (a) {
				var b, c;
				null ===
					(c =
						null === (b = this.destination) || void 0 === b
							? void 0
							: b.error) || void 0 === c
					? void 0
					: c.call(b, a);
			};
			a.prototype.complete = function () {
				var a, b;
				null ===
					(b =
						null === (a = this.destination) || void 0 === a
							? void 0
							: a.complete) || void 0 === b
					? void 0
					: b.call(a);
			};
			a.prototype._subscribe = function (a) {
				var b, c;
				return null !==
					(c =
						null === (b = this.source) || void 0 === b
							? void 0
							: b.subscribe(a)) && void 0 !== c
					? c
					: Qd;
			};
			return a;
		})(B),
		Zc = (function (b) {
			function a(a) {
				var c = b.call(this) || this;
				c._value = a;
				return c;
			}
			y(a, b);
			Object.defineProperty(a.prototype, 'value', {
				get: function () {
					return this.getValue();
				},
				enumerable: !1,
				configurable: !0
			});
			a.prototype._subscribe = function (a) {
				var c = b.prototype._subscribe.call(this, a);
				!c.closed && a.next(this._value);
				return c;
			};
			a.prototype.getValue = function () {
				var a = this.thrownError,
					b = this._value;
				if (this.hasError) throw a;
				this._throwIfClosed();
				return b;
			};
			a.prototype.next = function (a) {
				b.prototype.next.call(this, (this._value = a));
			};
			return a;
		})(B),
		la = {
			now: function () {
				return (la.delegate || Date).now();
			},
			delegate: void 0
		},
		ia = (function (b) {
			function a(a, d, e) {
				void 0 === a && (a = Infinity);
				void 0 === d && (d = Infinity);
				void 0 === e && (e = la);
				var c = b.call(this) || this;
				c._bufferSize = a;
				c._windowTime = d;
				c._timestampProvider = e;
				c._buffer = [];
				c._infiniteTimeWindow = Infinity === d;
				c._bufferSize = Math.max(1, a);
				c._windowTime = Math.max(1, d);
				return c;
			}
			y(a, b);
			a.prototype.next = function (a) {
				var c = this._buffer,
					e = this._infiniteTimeWindow,
					f = this._timestampProvider,
					h = this._windowTime;
				this.isStopped || (c.push(a), !e && c.push(f.now() + h));
				this._trimBuffer();
				b.prototype.next.call(this, a);
			};
			a.prototype._subscribe = function (a) {
				this._throwIfClosed();
				this._trimBuffer();
				for (
					var b = this._innerSubscribe(a),
						c = this._infiniteTimeWindow,
						f = this._buffer.slice(),
						h = 0;
					h < f.length && !a.closed;
					h += c ? 1 : 2
				)
					a.next(f[h]);
				this._checkFinalizedStatuses(a);
				return b;
			};
			a.prototype._trimBuffer = function () {
				var a = this._bufferSize,
					b = this._timestampProvider,
					e = this._buffer,
					f = this._infiniteTimeWindow,
					h = (f ? 1 : 2) * a;
				Infinity > a && h < e.length && e.splice(0, e.length - h);
				if (!f) {
					a = b.now();
					b = 0;
					for (f = 1; f < e.length && e[f] <= a; f += 2) b = f;
					b && e.splice(0, b + 1);
				}
			};
			return a;
		})(B),
		fb = (function (b) {
			function a() {
				var a = (null !== b && b.apply(this, arguments)) || this;
				a._value = null;
				a._hasValue = !1;
				a._isComplete = !1;
				return a;
			}
			y(a, b);
			a.prototype._checkFinalizedStatuses = function (a) {
				var b = this._hasValue,
					c = this._value,
					f = this.thrownError,
					h = this.isStopped,
					g = this._isComplete;
				if (this.hasError) a.error(f);
				else if (h || g) b && a.next(c), a.complete();
			};
			a.prototype.next = function (a) {
				this.isStopped || ((this._value = a), (this._hasValue = !0));
			};
			a.prototype.complete = function () {
				var a = this._hasValue,
					d = this._value;
				this._isComplete ||
					((this._isComplete = !0),
					a && b.prototype.next.call(this, d),
					b.prototype.complete.call(this));
			};
			return a;
		})(B),
		ma = {
			setInterval: function (b, a) {
				for (var c = [], d = 2; d < arguments.length; d++)
					c[d - 2] = arguments[d];
				d = ma.delegate;
				return (null === d || void 0 === d ? 0 : d.setInterval)
					? d.setInterval.apply(d, z([b, a], x(c)))
					: setInterval.apply(void 0, z([b, a], x(c)));
			},
			clearInterval: function (b) {
				var a = ma.delegate;
				return (
					(null === a || void 0 === a ? void 0 : a.clearInterval) ||
					clearInterval
				)(b);
			},
			delegate: void 0
		},
		za = (function (b) {
			function a(a, d) {
				var c = b.call(this, a, d) || this;
				c.scheduler = a;
				c.work = d;
				c.pending = !1;
				return c;
			}
			y(a, b);
			a.prototype.schedule = function (a, b) {
				var c;
				void 0 === b && (b = 0);
				if (this.closed) return this;
				this.state = a;
				a = this.id;
				var d = this.scheduler;
				null != a && (this.id = this.recycleAsyncId(d, a, b));
				this.pending = !0;
				this.delay = b;
				this.id =
					null !== (c = this.id) && void 0 !== c
						? c
						: this.requestAsyncId(d, this.id, b);
				return this;
			};
			a.prototype.requestAsyncId = function (a, b, e) {
				void 0 === e && (e = 0);
				return ma.setInterval(a.flush.bind(a, this), e);
			};
			a.prototype.recycleAsyncId = function (a, b, e) {
				void 0 === e && (e = 0);
				if (null != e && this.delay === e && !1 === this.pending) return b;
				null != b && ma.clearInterval(b);
			};
			a.prototype.execute = function (a, b) {
				if (this.closed) return Error('executing a cancelled action');
				this.pending = !1;
				if ((a = this._execute(a, b))) return a;
				!1 === this.pending &&
					null != this.id &&
					(this.id = this.recycleAsyncId(this.scheduler, this.id, null));
			};
			a.prototype._execute = function (a, b) {
				b = !1;
				var c;
				try {
					this.work(a);
				} catch (f) {
					(b = !0), (c = f ? f : Error('Scheduled action threw falsy error'));
				}
				if (b) return this.unsubscribe(), c;
			};
			a.prototype.unsubscribe = function () {
				if (!this.closed) {
					var a = this.id,
						d = this.scheduler,
						e = d.actions;
					this.work = this.state = this.scheduler = null;
					this.pending = !1;
					M(e, this);
					null != a && (this.id = this.recycleAsyncId(d, a, null));
					this.delay = null;
					b.prototype.unsubscribe.call(this);
				}
			};
			return a;
		})(
			(function (b) {
				function a(a, d) {
					return b.call(this) || this;
				}
				y(a, b);
				a.prototype.schedule = function (a, b) {
					return this;
				};
				return a;
			})(D)
		),
		Ve = 1,
		Eb,
		$a = {},
		We = function (b) {
			var a = Ve++;
			$a[a] = !0;
			Eb || (Eb = Promise.resolve());
			Eb.then(function () {
				return Nb(a) && b();
			});
			return a;
		},
		Xe = function (b) {
			Nb(b);
		},
		na = {
			setImmediate: function () {
				for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
				a = na.delegate;
				return (
					(null === a || void 0 === a ? void 0 : a.setImmediate) || We
				).apply(void 0, z([], x(b)));
			},
			clearImmediate: function (b) {
				var a = na.delegate;
				return ((null === a || void 0 === a ? void 0 : a.clearImmediate) || Xe)(
					b
				);
			},
			delegate: void 0
		},
		Ye = (function (b) {
			function a(a, d) {
				var c = b.call(this, a, d) || this;
				c.scheduler = a;
				c.work = d;
				return c;
			}
			y(a, b);
			a.prototype.requestAsyncId = function (a, d, e) {
				void 0 === e && (e = 0);
				if (null !== e && 0 < e)
					return b.prototype.requestAsyncId.call(this, a, d, e);
				a.actions.push(this);
				return (
					a._scheduled ||
					(a._scheduled = na.setImmediate(a.flush.bind(a, void 0)))
				);
			};
			a.prototype.recycleAsyncId = function (a, d, e) {
				var c;
				void 0 === e && (e = 0);
				if (null != e ? 0 < e : 0 < this.delay)
					return b.prototype.recycleAsyncId.call(this, a, d, e);
				e = a.actions;
				null != d &&
					(null === (c = e[e.length - 1]) || void 0 === c ? void 0 : c.id) !==
						d &&
					(na.clearImmediate(d), (a._scheduled = void 0));
			};
			return a;
		})(za),
		Fb = (function () {
			function b(a, c) {
				void 0 === c && (c = b.now);
				this.schedulerActionCtor = a;
				this.now = c;
			}
			b.prototype.schedule = function (a, b, d) {
				void 0 === b && (b = 0);
				return new this.schedulerActionCtor(this, a).schedule(d, b);
			};
			b.now = la.now;
			return b;
		})(),
		Aa = (function (b) {
			function a(a, d) {
				void 0 === d && (d = Fb.now);
				a = b.call(this, a, d) || this;
				a.actions = [];
				a._active = !1;
				return a;
			}
			y(a, b);
			a.prototype.flush = function (a) {
				var b = this.actions;
				if (this._active) b.push(a);
				else {
					var c;
					this._active = !0;
					do if ((c = a.execute(a.state, a.delay))) break;
					while ((a = b.shift()));
					this._active = !1;
					if (c) {
						for (; (a = b.shift()); ) a.unsubscribe();
						throw c;
					}
				}
			};
			return a;
		})(Fb),
		Sd = new ((function (b) {
			function a() {
				return (null !== b && b.apply(this, arguments)) || this;
			}
			y(a, b);
			a.prototype.flush = function (a) {
				this._active = !0;
				var b = this._scheduled;
				this._scheduled = void 0;
				var c = this.actions,
					f;
				a = a || c.shift();
				do if ((f = a.execute(a.state, a.delay))) break;
				while ((a = c[0]) && a.id === b && c.shift());
				this._active = !1;
				if (f) {
					for (; (a = c[0]) && a.id === b && c.shift(); ) a.unsubscribe();
					throw f;
				}
			};
			return a;
		})(Aa))(Ye),
		I = new Aa(za),
		ib = I,
		Ze = (function (b) {
			function a(a, d) {
				var c = b.call(this, a, d) || this;
				c.scheduler = a;
				c.work = d;
				return c;
			}
			y(a, b);
			a.prototype.schedule = function (a, d) {
				void 0 === d && (d = 0);
				if (0 < d) return b.prototype.schedule.call(this, a, d);
				this.delay = d;
				this.state = a;
				this.scheduler.flush(this);
				return this;
			};
			a.prototype.execute = function (a, d) {
				return 0 < d || this.closed
					? b.prototype.execute.call(this, a, d)
					: this._execute(a, d);
			};
			a.prototype.requestAsyncId = function (a, d, e) {
				void 0 === e && (e = 0);
				if ((null != e && 0 < e) || (null == e && 0 < this.delay))
					return b.prototype.requestAsyncId.call(this, a, d, e);
				a.flush(this);
				return 0;
			};
			return a;
		})(za),
		Td = new ((function (b) {
			function a() {
				return (null !== b && b.apply(this, arguments)) || this;
			}
			y(a, b);
			return a;
		})(Aa))(Ze),
		$e = (function (b) {
			function a(a, d) {
				var c = b.call(this, a, d) || this;
				c.scheduler = a;
				c.work = d;
				return c;
			}
			y(a, b);
			a.prototype.requestAsyncId = function (a, d, e) {
				void 0 === e && (e = 0);
				if (null !== e && 0 < e)
					return b.prototype.requestAsyncId.call(this, a, d, e);
				a.actions.push(this);
				return (
					a._scheduled ||
					(a._scheduled = N.requestAnimationFrame(function () {
						return a.flush(void 0);
					}))
				);
			};
			a.prototype.recycleAsyncId = function (a, d, e) {
				var c;
				void 0 === e && (e = 0);
				if (null != e ? 0 < e : 0 < this.delay)
					return b.prototype.recycleAsyncId.call(this, a, d, e);
				e = a.actions;
				null != d &&
					(null === (c = e[e.length - 1]) || void 0 === c ? void 0 : c.id) !==
						d &&
					(N.cancelAnimationFrame(d), (a._scheduled = void 0));
			};
			return a;
		})(za),
		Ud = new ((function (b) {
			function a() {
				return (null !== b && b.apply(this, arguments)) || this;
			}
			y(a, b);
			a.prototype.flush = function (a) {
				this._active = !0;
				var b = this._scheduled;
				this._scheduled = void 0;
				var c = this.actions,
					f;
				a = a || c.shift();
				do if ((f = a.execute(a.state, a.delay))) break;
				while ((a = c[0]) && a.id === b && c.shift());
				this._active = !1;
				if (f) {
					for (; (a = c[0]) && a.id === b && c.shift(); ) a.unsubscribe();
					throw f;
				}
			};
			return a;
		})(Aa))($e),
		Vd = (function (b) {
			function a(a, d) {
				void 0 === a && (a = Gb);
				void 0 === d && (d = Infinity);
				var c =
					b.call(this, a, function () {
						return c.frame;
					}) || this;
				c.maxFrames = d;
				c.frame = 0;
				c.index = -1;
				return c;
			}
			y(a, b);
			a.prototype.flush = function () {
				for (
					var a = this.actions, b = this.maxFrames, e, f;
					(f = a[0]) &&
					f.delay <= b &&
					!(a.shift(),
					(this.frame = f.delay),
					(e = f.execute(f.state, f.delay)));

				);
				if (e) {
					for (; (f = a.shift()); ) f.unsubscribe();
					throw e;
				}
			};
			a.frameTimeFactor = 10;
			return a;
		})(Aa),
		Gb = (function (b) {
			function a(a, d, e) {
				void 0 === e && (e = a.index += 1);
				var c = b.call(this, a, d) || this;
				c.scheduler = a;
				c.work = d;
				c.index = e;
				c.active = !0;
				c.index = a.index = e;
				return c;
			}
			y(a, b);
			a.prototype.schedule = function (c, d) {
				void 0 === d && (d = 0);
				if (Number.isFinite(d)) {
					if (!this.id) return b.prototype.schedule.call(this, c, d);
					this.active = !1;
					var e = new a(this.scheduler, this.work);
					this.add(e);
					return e.schedule(c, d);
				}
				return D.EMPTY;
			};
			a.prototype.requestAsyncId = function (b, d, e) {
				void 0 === e && (e = 0);
				this.delay = b.frame + e;
				b = b.actions;
				b.push(this);
				b.sort(a.sortActions);
				return 1;
			};
			a.prototype.recycleAsyncId = function (a, b, e) {};
			a.prototype._execute = function (a, d) {
				if (!0 === this.active) return b.prototype._execute.call(this, a, d);
			};
			a.sortActions = function (a, b) {
				return a.delay === b.delay
					? a.index === b.index
						? 0
						: a.index > b.index
						? 1
						: -1
					: a.delay > b.delay
					? 1
					: -1;
			};
			return a;
		})(za),
		L = new t(function (b) {
			return b.complete();
		}),
		bb = function (b) {
			return b && 'number' === typeof b.length && 'function' !== typeof b;
		},
		ab;
	ab =
		'function' === typeof Symbol && Symbol.iterator
			? Symbol.iterator
			: '@@iterator';
	(function (b) {
		b.NEXT = 'N';
		b.ERROR = 'E';
		b.COMPLETE = 'C';
	})(g.NotificationKind || (g.NotificationKind = {}));
	var Qa = (function () {
			function b(a, b, d) {
				this.kind = a;
				this.value = b;
				this.error = d;
				this.hasValue = 'N' === a;
			}
			b.prototype.observe = function (a) {
				return Ga(this, a);
			};
			b.prototype.do = function (a, b, d) {
				var c = this.kind,
					f = this.value,
					g = this.error;
				return 'N' === c
					? null === a || void 0 === a
						? void 0
						: a(f)
					: 'E' === c
					? null === b || void 0 === b
						? void 0
						: b(g)
					: null === d || void 0 === d
					? void 0
					: d();
			};
			b.prototype.accept = function (a, b, d) {
				return p(null === a || void 0 === a ? void 0 : a.next)
					? this.observe(a)
					: this.do(a, b, d);
			};
			b.prototype.toObservable = function () {
				var a = this.kind,
					b = this.value,
					d = this.error,
					b =
						'N' === a
							? cb(b)
							: 'E' === a
							? Wb(function () {
									return d;
							  })
							: 'C' === a
							? L
							: 0;
				if (!b) throw new TypeError('Unexpected notification kind ' + a);
				return b;
			};
			b.createNext = function (a) {
				return new b('N', a);
			};
			b.createError = function (a) {
				return new b('E', void 0, a);
			};
			b.createComplete = function () {
				return b.completeNotification;
			};
			b.completeNotification = new b('C');
			return b;
		})(),
		ba = S(function (b) {
			return function () {
				b(this);
				this.name = 'EmptyError';
				this.message = 'no elements in sequence';
			};
		}),
		rb = S(function (b) {
			return function () {
				b(this);
				this.name = 'ArgumentOutOfRangeError';
				this.message = 'argument out of range';
			};
		}),
		ld = S(function (b) {
			return function (a) {
				b(this);
				this.name = 'NotFoundError';
				this.message = a;
			};
		}),
		kd = S(function (b) {
			return function (a) {
				b(this);
				this.name = 'SequenceError';
				this.message = a;
			};
		}),
		Xb = S(function (b) {
			return function (a) {
				void 0 === a && (a = null);
				b(this);
				this.message = 'Timeout has occurred';
				this.name = 'TimeoutError';
				this.info = a;
			};
		}),
		me = Array.isArray,
		ne = Array.isArray,
		oe = Object.getPrototypeOf,
		pe = Object.prototype,
		qe = Object.keys,
		af = {
			connector: function () {
				return new B();
			},
			resetOnDisconnect: !0
		},
		ue = ['addListener', 'removeListener'],
		se = ['addEventListener', 'removeEventListener'],
		we = ['on', 'off'],
		Wd = new t(C),
		xe = Array.isArray,
		Be = function (b, a) {
			return b.push(a), b;
		},
		De = {
			connector: function () {
				return new B();
			}
		},
		xd = { leading: !0, trailing: !1 },
		Ge = (function () {
			return function (b, a) {
				this.value = b;
				this.interval = a;
			};
		})(),
		bf = Object.freeze({
			audit: kb,
			auditTime: ic,
			buffer: jc,
			bufferCount: kc,
			bufferTime: lc,
			bufferToggle: mc,
			bufferWhen: nc,
			catchError: lb,
			combineAll: Ka,
			combineLatestAll: Ka,
			combineLatest: nb,
			combineLatestWith: qc,
			concat: sc,
			concatAll: Ia,
			concatMap: La,
			concatMapTo: rc,
			concatWith: tc,
			connect: Ma,
			count: uc,
			debounce: vc,
			debounceTime: wc,
			defaultIfEmpty: va,
			delay: xc,
			delayWhen: Na,
			dematerialize: yc,
			distinct: zc,
			distinctUntilChanged: qb,
			distinctUntilKeyChanged: Ac,
			elementAt: Bc,
			endWith: Cc,
			every: Dc,
			exhaust: Pa,
			exhaustAll: Pa,
			exhaustMap: Oa,
			expand: Ec,
			filter: K,
			finalize: Fc,
			find: Gc,
			findIndex: Ic,
			first: Jc,
			groupBy: Kc,
			ignoreElements: ob,
			isEmpty: Lc,
			last: Mc,
			map: Q,
			mapTo: pb,
			materialize: Nc,
			max: Oc,
			merge: Rc,
			mergeAll: ta,
			flatMap: H,
			mergeMap: H,
			mergeMapTo: Pc,
			mergeScan: Qc,
			mergeWith: Sc,
			min: Tc,
			multicast: Ra,
			observeOn: ra,
			onErrorResumeNext: Uc,
			pairwise: Vc,
			partition: function (b, a) {
				return function (c) {
					return [K(b, a)(c), K(gc(b, a))(c)];
				};
			},
			pluck: Wc,
			publish: Xc,
			publishBehavior: Yc,
			publishLast: $c,
			publishReplay: ad,
			race: function () {
				for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
				return tb.apply(void 0, z([], x(aa(b))));
			},
			raceWith: tb,
			reduce: ga,
			repeat: bd,
			repeatWhen: cd,
			retry: dd,
			retryWhen: ed,
			refCount: Za,
			sample: ub,
			sampleTime: fd,
			scan: gd,
			sequenceEqual: hd,
			share: vb,
			shareReplay: id,
			single: jd,
			skip: md,
			skipLast: nd,
			skipUntil: od,
			skipWhile: pd,
			startWith: qd,
			subscribeOn: sa,
			switchAll: rd,
			switchMap: ka,
			switchMapTo: sd,
			switchScan: td,
			take: ha,
			takeLast: sb,
			takeUntil: ud,
			takeWhile: vd,
			tap: wd,
			throttle: xb,
			throttleTime: yd,
			throwIfEmpty: wa,
			timeInterval: zd,
			timeout: eb,
			timeoutWith: Ad,
			timestamp: Bd,
			toArray: mb,
			window: Cd,
			windowCount: Dd,
			windowTime: Ed,
			windowToggle: Fd,
			windowWhen: Gd,
			withLatestFrom: Hd,
			zip: Jd,
			zipAll: Id,
			zipWith: Kd
		}),
		Ba = (function () {
			return function (b, a) {
				void 0 === a && (a = Infinity);
				this.subscribedFrame = b;
				this.unsubscribedFrame = a;
			};
		})(),
		Xd = (function () {
			function b() {
				this.subscriptions = [];
			}
			b.prototype.logSubscribedFrame = function () {
				this.subscriptions.push(new Ba(this.scheduler.now()));
				return this.subscriptions.length - 1;
			};
			b.prototype.logUnsubscribedFrame = function (a) {
				var b = this.subscriptions;
				b[a] = new Ba(b[a].subscribedFrame, this.scheduler.now());
			};
			return b;
		})(),
		Hb = (function (b) {
			function a(a, d) {
				var c =
					b.call(this, function (a) {
						var b = this,
							c = b.logSubscribedFrame(),
							d = new D();
						d.add(
							new D(function () {
								b.logUnsubscribedFrame(c);
							})
						);
						b.scheduleMessages(a);
						return d;
					}) || this;
				c.messages = a;
				c.subscriptions = [];
				c.scheduler = d;
				return c;
			}
			y(a, b);
			a.prototype.scheduleMessages = function (a) {
				for (var b = this.messages.length, c = 0; c < b; c++) {
					var f = this.messages[c];
					a.add(
						this.scheduler.schedule(
							function (a) {
								Ga(a.message.notification, a.subscriber);
							},
							f.frame,
							{ message: f, subscriber: a }
						)
					);
				}
			};
			return a;
		})(t);
	Ld(Hb, [Xd]);
	var Yd = (function (b) {
		function a(a, d) {
			var c = b.call(this) || this;
			c.messages = a;
			c.subscriptions = [];
			c.scheduler = d;
			return c;
		}
		y(a, b);
		a.prototype._subscribe = function (a) {
			var c = this,
				e = c.logSubscribedFrame(),
				f = new D();
			f.add(
				new D(function () {
					c.logUnsubscribedFrame(e);
				})
			);
			f.add(b.prototype._subscribe.call(this, a));
			return f;
		};
		a.prototype.setup = function () {
			for (
				var a = this,
					b = a.messages.length,
					e = function (b) {
						(function () {
							var c = a.messages[b],
								d = c.notification;
							a.scheduler.schedule(function () {
								Ga(d, a);
							}, c.frame);
						})();
					},
					f = 0;
				f < b;
				f++
			)
				e(f);
		};
		return a;
	})(B);
	Ld(Yd, [Xd]);
	var cf = (function (b) {
			function a(a) {
				var c = b.call(this, Gb, 750) || this;
				c.assertDeepEqual = a;
				c.hotObservables = [];
				c.coldObservables = [];
				c.flushTests = [];
				c.runMode = !1;
				return c;
			}
			y(a, b);
			a.prototype.createTime = function (b) {
				b = this.runMode ? b.trim().indexOf('|') : b.indexOf('|');
				if (-1 === b)
					throw Error(
						'marble diagram for time should have a completion marker "|"'
					);
				return b * a.frameTimeFactor;
			};
			a.prototype.createColdObservable = function (b, d, e) {
				if (-1 !== b.indexOf('^'))
					throw Error('cold observable cannot have subscription offset "^"');
				if (-1 !== b.indexOf('!'))
					throw Error('cold observable cannot have unsubscription marker "!"');
				b = a.parseMarbles(b, d, e, void 0, this.runMode);
				b = new Hb(b, this);
				this.coldObservables.push(b);
				return b;
			};
			a.prototype.createHotObservable = function (b, d, e) {
				if (-1 !== b.indexOf('!'))
					throw Error('hot observable cannot have unsubscription marker "!"');
				b = a.parseMarbles(b, d, e, void 0, this.runMode);
				b = new Yd(b, this);
				this.hotObservables.push(b);
				return b;
			};
			a.prototype.materializeInnerObservable = function (a, b) {
				var c = this,
					d = [];
				a.subscribe({
					next: function (a) {
						d.push({ frame: c.frame - b, notification: J('N', a, void 0) });
					},
					error: function (a) {
						d.push({ frame: c.frame - b, notification: J('E', void 0, a) });
					},
					complete: function () {
						d.push({ frame: c.frame - b, notification: ya });
					}
				});
				return d;
			};
			a.prototype.expectObservable = function (b, d) {
				var c = this;
				void 0 === d && (d = null);
				var f = [],
					g = { actual: f, ready: !1 };
				d = a.parseMarblesAsSubscriptions(d, this.runMode);
				var l = Infinity === d.subscribedFrame ? 0 : d.subscribedFrame;
				d = d.unsubscribedFrame;
				var k;
				this.schedule(function () {
					k = b.subscribe({
						next: function (a) {
							a = a instanceof t ? c.materializeInnerObservable(a, c.frame) : a;
							f.push({ frame: c.frame, notification: J('N', a, void 0) });
						},
						error: function (a) {
							f.push({ frame: c.frame, notification: J('E', void 0, a) });
						},
						complete: function () {
							f.push({ frame: c.frame, notification: ya });
						}
					});
				}, l);
				Infinity !== d &&
					this.schedule(function () {
						return k.unsubscribe();
					}, d);
				this.flushTests.push(g);
				var m = this.runMode;
				return {
					toBe: function (b, c, d) {
						g.ready = !0;
						g.expected = a.parseMarbles(b, c, d, !0, m);
					},
					toEqual: function (a) {
						g.ready = !0;
						g.expected = [];
						c.schedule(function () {
							k = a.subscribe({
								next: function (a) {
									a =
										a instanceof t
											? c.materializeInnerObservable(a, c.frame)
											: a;
									g.expected.push({
										frame: c.frame,
										notification: J('N', a, void 0)
									});
								},
								error: function (a) {
									g.expected.push({
										frame: c.frame,
										notification: J('E', void 0, a)
									});
								},
								complete: function () {
									g.expected.push({ frame: c.frame, notification: ya });
								}
							});
						}, l);
					}
				};
			};
			a.prototype.expectSubscriptions = function (b) {
				var c = { actual: b, ready: !1 };
				this.flushTests.push(c);
				var e = this.runMode;
				return {
					toBe: function (b) {
						b = 'string' === typeof b ? [b] : b;
						c.ready = !0;
						c.expected = b
							.map(function (b) {
								return a.parseMarblesAsSubscriptions(b, e);
							})
							.filter(function (a) {
								return Infinity !== a.subscribedFrame;
							});
					}
				};
			};
			a.prototype.flush = function () {
				for (var a = this, d = this.hotObservables; 0 < d.length; )
					d.shift().setup();
				b.prototype.flush.call(this);
				this.flushTests = this.flushTests.filter(function (b) {
					return b.ready ? (a.assertDeepEqual(b.actual, b.expected), !1) : !0;
				});
			};
			a.parseMarblesAsSubscriptions = function (a, b) {
				var c = this;
				void 0 === b && (b = !1);
				if ('string' !== typeof a) return new Ba(Infinity);
				var d = z([], x(a));
				a = d.length;
				for (
					var g = -1,
						l = Infinity,
						k = Infinity,
						m = 0,
						n = function (a) {
							var e = m,
								f = function (a) {
									e += a * c.frameTimeFactor;
								},
								h = d[a];
							switch (h) {
								case ' ':
									b || f(1);
									break;
								case '-':
									f(1);
									break;
								case '(':
									g = m;
									f(1);
									break;
								case ')':
									g = -1;
									f(1);
									break;
								case '^':
									if (Infinity !== l)
										throw Error(
											"found a second subscription point '^' in a subscription marble diagram. There can only be one."
										);
									l = -1 < g ? g : m;
									f(1);
									break;
								case '!':
									if (Infinity !== k)
										throw Error(
											"found a second unsubscription point '!' in a subscription marble diagram. There can only be one."
										);
									k = -1 < g ? g : m;
									break;
								default:
									if (
										b &&
										h.match(/^[0-9]$/) &&
										(0 === a || ' ' === d[a - 1])
									) {
										var n = d
											.slice(a)
											.join('')
											.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
										if (n) {
											a += n[0].length - 1;
											var h = parseFloat(n[1]),
												r = void 0;
											switch (n[2]) {
												case 'ms':
													r = h;
													break;
												case 's':
													r = 1e3 * h;
													break;
												case 'm':
													r = 6e4 * h;
											}
											f(r / p.frameTimeFactor);
											break;
										}
									}
									throw Error(
										"there can only be '^' and '!' markers in a subscription marble diagram. Found instead '" +
											h +
											"'."
									);
							}
							m = e;
							q = a;
						},
						p = this,
						q,
						t = 0;
					t < a;
					t++
				)
					n(t), (t = q);
				return 0 > k ? new Ba(l) : new Ba(l, k);
			};
			a.parseMarbles = function (a, b, e, f, g) {
				var c = this;
				void 0 === f && (f = !1);
				void 0 === g && (g = !1);
				if (-1 !== a.indexOf('!'))
					throw Error(
						'conventional marble diagrams cannot have the unsubscription marker "!"'
					);
				var d = z([], x(a)),
					h = d.length,
					m = [];
				a = g ? a.replace(/^[ ]+/, '').indexOf('^') : a.indexOf('^');
				var n = -1 === a ? 0 : a * -this.frameTimeFactor,
					p =
						'object' !== typeof b
							? function (a) {
									return a;
							  }
							: function (a) {
									return f && b[a] instanceof Hb ? b[a].messages : b[a];
							  },
					q = -1;
				a = function (a) {
					var b = n,
						f = function (a) {
							b += a * c.frameTimeFactor;
						},
						h = void 0,
						k = d[a];
					switch (k) {
						case ' ':
							g || f(1);
							break;
						case '-':
							f(1);
							break;
						case '(':
							q = n;
							f(1);
							break;
						case ')':
							q = -1;
							f(1);
							break;
						case '|':
							h = ya;
							f(1);
							break;
						case '^':
							f(1);
							break;
						case '#':
							h = J('E', void 0, e || 'error');
							f(1);
							break;
						default:
							if (g && k.match(/^[0-9]$/) && (0 === a || ' ' === d[a - 1])) {
								var l = d
									.slice(a)
									.join('')
									.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
								if (l) {
									a += l[0].length - 1;
									var k = parseFloat(l[1]),
										r = void 0;
									switch (l[2]) {
										case 'ms':
											r = k;
											break;
										case 's':
											r = 1e3 * k;
											break;
										case 'm':
											r = 6e4 * k;
									}
									f(r / u.frameTimeFactor);
									break;
								}
							}
							h = J('N', p(k), void 0);
							f(1);
					}
					h && m.push({ frame: -1 < q ? q : n, notification: h });
					n = b;
					t = a;
				};
				for (var u = this, t, y = 0; y < h; y++) a(y), (y = t);
				return m;
			};
			a.prototype.createAnimator = function () {
				var b = this;
				if (!this.runMode)
					throw Error('animate() must only be used in run mode');
				var d = 0,
					e;
				return {
					animate: function (c) {
						var d, f;
						if (e)
							throw Error(
								'animate() must not be called more than once within run()'
							);
						if (/[|#]/.test(c))
							throw Error('animate() must not complete or error');
						e = new Map();
						c = a.parseMarbles(c, void 0, void 0, void 0, !0);
						try {
							for (var g = F(c), m = g.next(); !m.done; m = g.next())
								b.schedule(function () {
									var a,
										c,
										d = b.now(),
										f = Array.from(e.values());
									e.clear();
									try {
										for (
											var g = ((a = void 0), F(f)), h = g.next();
											!h.done;
											h = g.next()
										) {
											var k = h.value;
											k(d);
										}
									} catch (Y) {
										a = { error: Y };
									} finally {
										try {
											h && !h.done && (c = g.return) && c.call(g);
										} finally {
											if (a) throw a.error;
										}
									}
								}, m.value.frame);
						} catch (r) {
							d = { error: r };
						} finally {
							try {
								m && !m.done && (f = g.return) && f.call(g);
							} finally {
								if (d) throw d.error;
							}
						}
					},
					delegate: {
						requestAnimationFrame: function (a) {
							if (!e) throw Error('animate() was not called within run()');
							var b = ++d;
							e.set(b, a);
							return b;
						},
						cancelAnimationFrame: function (a) {
							if (!e) throw Error('animate() was not called within run()');
							e.delete(a);
						}
					}
				};
			};
			a.prototype.createDelegates = function () {
				var a = this,
					b = 0,
					e = new Map(),
					f = function () {
						var b = a.now(),
							c = Array.from(e.values()).filter(function (a) {
								return a.due <= b;
							}),
							d = c.filter(function (a) {
								return 'immediate' === a.type;
							});
						if (0 < d.length)
							(d = d[0]), (c = d.handle), (d = d.handler), e.delete(c), d();
						else if (
							((d = c.filter(function (a) {
								return 'interval' === a.type;
							})),
							0 < d.length)
						) {
							var c = d[0],
								g = c.duration,
								d = c.handler;
							c.due = b + g;
							c.subscription = a.schedule(f, g);
							d();
						} else if (
							((c = c.filter(function (a) {
								return 'timeout' === a.type;
							})),
							0 < c.length)
						)
							(d = c[0]), (c = d.handle), (d = d.handler), e.delete(c), d();
						else throw Error('Expected a due immediate or interval');
					};
				return {
					immediate: {
						setImmediate: function (c) {
							var d = ++b;
							e.set(d, {
								due: a.now(),
								duration: 0,
								handle: d,
								handler: c,
								subscription: a.schedule(f, 0),
								type: 'immediate'
							});
							return d;
						},
						clearImmediate: function (a) {
							var b = e.get(a);
							b && (b.subscription.unsubscribe(), e.delete(a));
						}
					},
					interval: {
						setInterval: function (c, d) {
							void 0 === d && (d = 0);
							var g = ++b;
							e.set(g, {
								due: a.now() + d,
								duration: d,
								handle: g,
								handler: c,
								subscription: a.schedule(f, d),
								type: 'interval'
							});
							return g;
						},
						clearInterval: function (a) {
							var b = e.get(a);
							b && (b.subscription.unsubscribe(), e.delete(a));
						}
					},
					timeout: {
						setTimeout: function (c, d) {
							void 0 === d && (d = 0);
							var g = ++b;
							e.set(g, {
								due: a.now() + d,
								duration: d,
								handle: g,
								handler: c,
								subscription: a.schedule(f, d),
								type: 'timeout'
							});
							return g;
						},
						clearTimeout: function (a) {
							var b = e.get(a);
							b && (b.subscription.unsubscribe(), e.delete(a));
						}
					}
				};
			};
			a.prototype.run = function (b) {
				var c = a.frameTimeFactor,
					e = this.maxFrames;
				a.frameTimeFactor = 1;
				this.maxFrames = Infinity;
				this.runMode = !0;
				var f = this.createAnimator(),
					g = this.createDelegates();
				N.delegate = f.delegate;
				la.delegate = this;
				na.delegate = g.immediate;
				ma.delegate = g.interval;
				ea.delegate = g.timeout;
				Ea.delegate = this;
				f = {
					cold: this.createColdObservable.bind(this),
					hot: this.createHotObservable.bind(this),
					flush: this.flush.bind(this),
					time: this.createTime.bind(this),
					expectObservable: this.expectObservable.bind(this),
					expectSubscriptions: this.expectSubscriptions.bind(this),
					animate: f.animate
				};
				try {
					var l = b(f);
					this.flush();
					return l;
				} finally {
					(a.frameTimeFactor = c),
						(this.maxFrames = e),
						(this.runMode = !1),
						(N.delegate = void 0),
						(la.delegate = void 0),
						(na.delegate = void 0),
						(ma.delegate = void 0),
						(ea.delegate = void 0),
						(Ea.delegate = void 0);
				}
			};
			a.frameTimeFactor = 10;
			return a;
		})(Vd),
		df = Object.freeze({ TestScheduler: cf }),
		yb = (function () {
			return function (b, a, c, d) {
				void 0 === d && (d = 'download_load');
				this.originalEvent = b;
				this.xhr = a;
				this.request = c;
				this.type = d;
				c = a.status;
				d = a.responseType;
				this.status = null !== c && void 0 !== c ? c : 0;
				this.responseType = null !== d && void 0 !== d ? d : '';
				this.responseHeaders = (c = a.getAllResponseHeaders())
					? c.split('\n').reduce(function (a, b) {
							var c = b.indexOf(': ');
							a[b.slice(0, c)] = b.slice(c + 2);
							return a;
					  }, {})
					: {};
				this.response = Md(a);
				a = b.total;
				this.loaded = b.loaded;
				this.total = a;
			};
		})(),
		xa = S(function (b) {
			return function (a, b, d) {
				this.message = a;
				this.name = 'AjaxError';
				this.xhr = b;
				this.request = d;
				this.status = b.status;
				this.responseType = b.responseType;
				var c;
				try {
					c = Md(b);
				} catch (f) {
					c = b.responseText;
				}
				this.response = c;
			};
		}),
		Nd = (function () {
			function b(a, b) {
				xa.call(this, 'ajax timeout', a, b);
				this.name = 'AjaxTimeoutError';
				return this;
			}
			b.prototype = Object.create(xa.prototype);
			return b;
		})(),
		Ne = Q(function (b) {
			return b.response;
		}),
		ca = (function () {
			var b = function (a) {
				return Oe('string' === typeof a ? { url: a } : a);
			};
			b.get = He;
			b.post = Ie;
			b.delete = Je;
			b.put = Ke;
			b.patch = Le;
			b.getJSON = Me;
			return b;
		})(),
		Qe = 'upload',
		Pd = 'download',
		zb = 'loadstart',
		Ab = 'progress',
		Od = 'load',
		Re = Object.prototype.toString,
		ef = Object.freeze({
			ajax: ca,
			AjaxError: xa,
			AjaxTimeoutError: Nd,
			AjaxResponse: yb
		}),
		ff = {
			url: '',
			deserializer: function (b) {
				return JSON.parse(b.data);
			},
			serializer: function (b) {
				return JSON.stringify(b);
			}
		},
		Zd = (function (b) {
			function a(a, d) {
				var c = b.call(this) || this;
				c._socket = null;
				if (a instanceof t) (c.destination = d), (c.source = a);
				else {
					d = c._config = U({}, ff);
					c._output = new B();
					if ('string' === typeof a) d.url = a;
					else for (var f in a) a.hasOwnProperty(f) && (d[f] = a[f]);
					if (!d.WebSocketCtor && WebSocket) d.WebSocketCtor = WebSocket;
					else if (!d.WebSocketCtor)
						throw Error('no WebSocket constructor can be found');
					c.destination = new ia();
				}
				return c;
			}
			y(a, b);
			a.prototype.lift = function (b) {
				var c = new a(this._config, this.destination);
				c.operator = b;
				c.source = this;
				return c;
			};
			a.prototype._resetState = function () {
				this._socket = null;
				this.source || (this.destination = new ia());
				this._output = new B();
			};
			a.prototype.multiplex = function (a, b, e) {
				var c = this;
				return new t(function (d) {
					try {
						c.next(a());
					} catch (k) {
						d.error(k);
					}
					var f = c.subscribe({
						next: function (a) {
							try {
								e(a) && d.next(a);
							} catch (w) {
								d.error(w);
							}
						},
						error: function (a) {
							return d.error(a);
						},
						complete: function () {
							return d.complete();
						}
					});
					return function () {
						try {
							c.next(b());
						} catch (k) {
							d.error(k);
						}
						f.unsubscribe();
					};
				});
			};
			a.prototype._connectSocket = function () {
				var a = this,
					b = this._config,
					e = b.WebSocketCtor,
					f = b.protocol,
					g = b.url,
					b = b.binaryType,
					l = this._output,
					k = null;
				try {
					(this._socket = k = f ? new e(g, f) : new e(g)),
						b && (this._socket.binaryType = b);
				} catch (r) {
					l.error(r);
					return;
				}
				var m = new D(function () {
					a._socket = null;
					k && 1 === k.readyState && k.close();
				});
				k.onopen = function (b) {
					if (a._socket) {
						var c = a._config.openObserver;
						c && c.next(b);
						b = a.destination;
						a.destination = oa.create(
							function (b) {
								if (1 === k.readyState)
									try {
										var c = a._config.serializer;
										k.send(c(b));
									} catch (u) {
										a.destination.error(u);
									}
							},
							function (b) {
								var c = a._config.closingObserver;
								c && c.next(void 0);
								b && b.code
									? k.close(b.code, b.reason)
									: l.error(
											new TypeError(
												'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }'
											)
									  );
								a._resetState();
							},
							function () {
								var b = a._config.closingObserver;
								b && b.next(void 0);
								k.close();
								a._resetState();
							}
						);
						b && b instanceof ia && m.add(b.subscribe(a.destination));
					} else k.close(), a._resetState();
				};
				k.onerror = function (b) {
					a._resetState();
					l.error(b);
				};
				k.onclose = function (b) {
					k === a._socket && a._resetState();
					var c = a._config.closeObserver;
					c && c.next(b);
					b.wasClean ? l.complete() : l.error(b);
				};
				k.onmessage = function (b) {
					try {
						var c = a._config.deserializer;
						l.next(c(b));
					} catch (A) {
						l.error(A);
					}
				};
			};
			a.prototype._subscribe = function (a) {
				var b = this,
					c = this.source;
				if (c) return c.subscribe(a);
				this._socket || this._connectSocket();
				this._output.subscribe(a);
				a.add(function () {
					var a = b._socket;
					0 === b._output.observers.length &&
						(!a || (1 !== a.readyState && 0 !== a.readyState) || a.close(),
						b._resetState());
				});
				return a;
			};
			a.prototype.unsubscribe = function () {
				var a = this._socket;
				!a || (1 !== a.readyState && 0 !== a.readyState) || a.close();
				this._resetState();
				b.prototype.unsubscribe.call(this);
			};
			return a;
		})(Db),
		gf = Object.freeze({
			webSocket: function (b) {
				return new Zd(b);
			},
			WebSocketSubject: Zd
		}),
		hf = Object.freeze({
			fromFetch: function (b, a) {
				void 0 === a && (a = {});
				var c = a.selector,
					d = $d(a, ['selector']);
				return new t(function (a) {
					var e = new AbortController(),
						g = e.signal,
						l = !0,
						k = d.signal;
					if (k)
						if (k.aborted) e.abort();
						else {
							var n = function () {
								g.aborted || e.abort();
							};
							k.addEventListener('abort', n);
							a.add(function () {
								return k.removeEventListener('abort', n);
							});
						}
					var p = U(U({}, d), { signal: g }),
						t = function (b) {
							l = !1;
							a.error(b);
						};
					fetch(b, p)
						.then(function (b) {
							c
								? q(c(b)).subscribe(
										m(
											a,
											void 0,
											function () {
												l = !1;
												a.complete();
											},
											t
										)
								  )
								: ((l = !1), a.next(b), a.complete());
						})
						.catch(t);
					return function () {
						l && e.abort();
					};
				});
			}
		});
	g.operators = bf;
	g.testing = df;
	g.ajax = ef;
	g.webSocket = gf;
	g.fetch = hf;
	g.Observable = t;
	g.ConnectableObservable = Sa;
	g.observable = qa;
	g.animationFrames = function (b) {
		return b ? Mb(b) : Ue;
	};
	g.Subject = B;
	g.BehaviorSubject = Zc;
	g.ReplaySubject = ia;
	g.AsyncSubject = fb;
	g.asap = Sd;
	g.asapScheduler = Sd;
	g.async = ib;
	g.asyncScheduler = I;
	g.queue = Td;
	g.queueScheduler = Td;
	g.animationFrame = Ud;
	g.animationFrameScheduler = Ud;
	g.VirtualTimeScheduler = Vd;
	g.VirtualAction = Gb;
	g.Scheduler = Fb;
	g.Subscription = D;
	g.Subscriber = oa;
	g.Notification = Qa;
	g.pipe = Xa;
	g.noop = C;
	g.identity = E;
	g.isObservable = function (b) {
		return !!b && (b instanceof t || (p(b.lift) && p(b.subscribe)));
	};
	g.lastValueFrom = function (b, a) {
		var c = 'object' === typeof a;
		return new Promise(function (d, e) {
			var f = !1,
				g;
			b.subscribe({
				next: function (a) {
					g = a;
					f = !0;
				},
				error: e,
				complete: function () {
					f ? d(g) : c ? d(a.defaultValue) : e(new ba());
				}
			});
		});
	};
	g.firstValueFrom = function (b, a) {
		var c = 'object' === typeof a;
		return new Promise(function (d, e) {
			var f = new ja({
				next: function (a) {
					d(a);
					f.unsubscribe();
				},
				error: e,
				complete: function () {
					c ? d(a.defaultValue) : e(new ba());
				}
			});
			b.subscribe(f);
		});
	};
	g.ArgumentOutOfRangeError = rb;
	g.EmptyError = ba;
	g.NotFoundError = ld;
	g.ObjectUnsubscribedError = Rd;
	g.SequenceError = kd;
	g.TimeoutError = Xb;
	g.UnsubscriptionError = Ta;
	g.bindCallback = function (b, a, c) {
		return Ha(!1, b, a, c);
	};
	g.bindNodeCallback = function (b, a, c) {
		return Ha(!0, b, a, c);
	};
	g.combineLatest = $b;
	g.concat = ua;
	g.connectable = function (b, a) {
		void 0 === a && (a = af);
		var c = null,
			d = a.connector;
		a = a.resetOnDisconnect;
		var e = void 0 === a ? !0 : a,
			f = d();
		a = new t(function (a) {
			return f.subscribe(a);
		});
		a.connect = function () {
			if (!c || c.closed)
				(c = Ja(function () {
					return b;
				}).subscribe(f)),
					e &&
						c.add(function () {
							return (f = d());
						});
			return c;
		};
		return a;
	};
	g.defer = Ja;
	g.empty = function (b) {
		return b ? ee(b) : L;
	};
	g.forkJoin = function () {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var a = pa(b),
			b = Yb(b),
			c = b.args,
			d = b.keys,
			b = new t(function (a) {
				var b = c.length;
				if (b)
					for (
						var e = Array(b),
							g = b,
							k = b,
							n = function (b) {
								var f = !1;
								q(c[b]).subscribe(
									m(
										a,
										function (a) {
											f || ((f = !0), k--);
											e[b] = a;
										},
										function () {
											return g--;
										},
										void 0,
										function () {
											(g && f) || (k || a.next(d ? Zb(d, e) : e), a.complete());
										}
									)
								);
							},
							p = 0;
						p < b;
						p++
					)
						n(p);
				else a.complete();
			});
		return a ? b.pipe(X(a)) : b;
	};
	g.from = P;
	g.fromEvent = hb;
	g.fromEventPattern = dc;
	g.generate = function (b, a, c, d, e) {
		function f() {
			var b;
			return Va(this, function (d) {
				switch (d.label) {
					case 0:
						(b = k), (d.label = 1);
					case 1:
						return a && !a(b) ? [3, 4] : [4, l(b)];
					case 2:
						d.sent(), (d.label = 3);
					case 3:
						return (b = c(b)), [3, 1];
					case 4:
						return [2];
				}
			});
		}
		var g, l, k;
		1 === arguments.length
			? ((k = b.initialState),
			  (a = b.condition),
			  (c = b.iterate),
			  (g = b.resultSelector),
			  (l = void 0 === g ? E : g),
			  (e = b.scheduler))
			: ((k = b), !d || Fa(d) ? ((l = E), (e = d)) : (l = d));
		return Ja(
			e
				? function () {
						return Tb(f(), e);
				  }
				: f
		);
	};
	g.iif = function (b, a, c) {
		return Ja(function () {
			return b() ? a : c;
		});
	};
	g.interval = ec;
	g.merge = function () {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		var a = O(b),
			c = 'number' === typeof b[b.length - 1] ? b.pop() : Infinity;
		return b.length ? (1 === b.length ? q(b[0]) : ta(c)(P(b, a))) : L;
	};
	g.never = function () {
		return Wd;
	};
	g.of = cb;
	g.onErrorResumeNext = fc;
	g.pairs = function (b, a) {
		return P(Object.entries(b), a);
	};
	g.partition = function (b, a, c) {
		return [K(a, c)(q(b)), K(gc(a, c))(q(b))];
	};
	g.race = function () {
		for (var b = [], a = 0; a < arguments.length; a++) b[a] = arguments[a];
		b = aa(b);
		return 1 === b.length ? q(b[0]) : new t(hc(b));
	};
	g.range = function (b, a, c) {
		null == a && ((a = b), (b = 0));
		if (0 >= a) return L;
		var d = a + b;
		return new t(
			c
				? function (a) {
						var e = b;
						return c.schedule(function () {
							e < d ? (a.next(e++), this.schedule()) : a.complete();
						});
				  }
				: function (a) {
						for (var c = b; c < d && !a.closed; ) a.next(c++);
						a.complete();
				  }
		);
	};
	g.throwError = Wb;
	g.timer = Z;
	g.using = function (b, a) {
		return new t(function (c) {
			var d = b(),
				e = a(d);
			(e ? q(e) : L).subscribe(c);
			return function () {
				d && d.unsubscribe();
			};
		});
	};
	g.zip = jb;
	g.scheduled = Vb;
	g.EMPTY = L;
	g.NEVER = Wd;
	g.config = T;
	g.audit = kb;
	g.auditTime = ic;
	g.buffer = jc;
	g.bufferCount = kc;
	g.bufferTime = lc;
	g.bufferToggle = mc;
	g.bufferWhen = nc;
	g.catchError = lb;
	g.combineAll = Ka;
	g.combineLatestAll = Ka;
	g.combineLatestWith = qc;
	g.concatAll = Ia;
	g.concatMap = La;
	g.concatMapTo = rc;
	g.concatWith = tc;
	g.connect = Ma;
	g.count = uc;
	g.debounce = vc;
	g.debounceTime = wc;
	g.defaultIfEmpty = va;
	g.delay = xc;
	g.delayWhen = Na;
	g.dematerialize = yc;
	g.distinct = zc;
	g.distinctUntilChanged = qb;
	g.distinctUntilKeyChanged = Ac;
	g.elementAt = Bc;
	g.endWith = Cc;
	g.every = Dc;
	g.exhaust = Pa;
	g.exhaustAll = Pa;
	g.exhaustMap = Oa;
	g.expand = Ec;
	g.filter = K;
	g.finalize = Fc;
	g.find = Gc;
	g.findIndex = Ic;
	g.first = Jc;
	g.groupBy = Kc;
	g.ignoreElements = ob;
	g.isEmpty = Lc;
	g.last = Mc;
	g.map = Q;
	g.mapTo = pb;
	g.materialize = Nc;
	g.max = Oc;
	g.mergeAll = ta;
	g.flatMap = H;
	g.mergeMap = H;
	g.mergeMapTo = Pc;
	g.mergeScan = Qc;
	g.mergeWith = Sc;
	g.min = Tc;
	g.multicast = Ra;
	g.observeOn = ra;
	g.onErrorResumeNextWith = Uc;
	g.pairwise = Vc;
	g.pluck = Wc;
	g.publish = Xc;
	g.publishBehavior = Yc;
	g.publishLast = $c;
	g.publishReplay = ad;
	g.raceWith = tb;
	g.reduce = ga;
	g.repeat = bd;
	g.repeatWhen = cd;
	g.retry = dd;
	g.retryWhen = ed;
	g.refCount = Za;
	g.sample = ub;
	g.sampleTime = fd;
	g.scan = gd;
	g.sequenceEqual = hd;
	g.share = vb;
	g.shareReplay = id;
	g.single = jd;
	g.skip = md;
	g.skipLast = nd;
	g.skipUntil = od;
	g.skipWhile = pd;
	g.startWith = qd;
	g.subscribeOn = sa;
	g.switchAll = rd;
	g.switchMap = ka;
	g.switchMapTo = sd;
	g.switchScan = td;
	g.take = ha;
	g.takeLast = sb;
	g.takeUntil = ud;
	g.takeWhile = vd;
	g.tap = wd;
	g.throttle = xb;
	g.throttleTime = yd;
	g.throwIfEmpty = wa;
	g.timeInterval = zd;
	g.timeout = eb;
	g.timeoutWith = Ad;
	g.timestamp = Bd;
	g.toArray = mb;
	g.window = Cd;
	g.windowCount = Dd;
	g.windowTime = Ed;
	g.windowToggle = Fd;
	g.windowWhen = Gd;
	g.withLatestFrom = Hd;
	g.zipAll = Id;
	g.zipWith = Kd;
	Object.defineProperty(g, '__esModule', { value: !0 });
});
