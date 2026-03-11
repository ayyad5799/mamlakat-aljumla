import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════
//  GLOBAL STYLES
// ═══════════════════════════════════════════════════════
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --gold: #C9A84C; --gold-l: #E8CC7A; --gold-bg: #fffbf0;
  --navy: #0D1B2A; --navy2: #162535; --navy3: #1e3448;
  --cream: #FAF7F2; --white: #ffffff;
  --text: #1a1a2e; --muted: #7a7a8a; --border: #e8e0d0;
  --red: #e74c3c; --green: #27ae60; --blue: #2980b9; --orange: #e67e22;
  --r: 10px;
}
body { font-family: 'Cairo', sans-serif; background: var(--cream); color: var(--text); direction: rtl; }
button { font-family: 'Cairo', sans-serif; cursor: pointer; }
input, select, textarea { font-family: 'Cairo', sans-serif; direction: rtl; }
img { display: block; }
::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

/* ── NAVBAR ── */
.nb { background: var(--navy); position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,.35); }
.nb-top { background: var(--gold); text-align: center; padding: 5px; font-size: 12px; font-weight: 700; color: var(--navy); }
.nb-main { display: flex; align-items: center; justify-content: space-between; padding: 0 28px; height: 64px; }
.nb-logo { font-size: 20px; font-weight: 900; color: var(--gold); cursor: pointer; line-height: 1.2; }
.nb-logo small { display: block; font-size: 10px; color: rgba(255,255,255,.5); font-weight: 400; letter-spacing: 2px; }
.nb-links { display: flex; gap: 4px; }
.nb-link { color: rgba(255,255,255,.75); background: none; border: none; font-size: 14px; font-weight: 600;
  padding: 7px 14px; border-radius: 7px; transition: all .2s; }
.nb-link:hover, .nb-link.on { color: var(--gold); background: rgba(201,168,76,.12); }
.nb-acts { display: flex; gap: 8px; align-items: center; }
.ib { background: none; border: none; color: white; font-size: 19px; padding: 7px; border-radius: 7px; transition: all .2s; position: relative; }
.ib:hover { background: rgba(255,255,255,.1); color: var(--gold); }
.badge { position: absolute; top: 1px; right: 1px; background: var(--gold); color: var(--navy);
  border-radius: 50%; width: 17px; height: 17px; font-size: 10px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; }

/* ── HERO ── */
.hero { background: linear-gradient(135deg, var(--navy) 0%, #1a3a5c 60%, var(--navy2) 100%);
  min-height: 460px; display: flex; align-items: center; padding: 56px 36px; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 25% 50%, rgba(201,168,76,.18) 0%, transparent 55%); }
.hero-c { position: relative; z-index: 1; max-width: 540px; }
.hero-tag { display: inline-block; background: var(--gold); color: var(--navy);
  padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 18px; }
.hero h1 { font-size: 48px; font-weight: 900; color: white; line-height: 1.1; margin-bottom: 14px; }
.hero h1 span { color: var(--gold); }
.hero p { color: rgba(255,255,255,.7); font-size: 16px; margin-bottom: 28px; line-height: 1.7; }
.hero-btns { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-deco { position: absolute; left: 5%; top: 50%; transform: translateY(-50%);
  width: 320px; height: 320px; border-radius: 50%;
  background: rgba(255,255,255,.04); border: 2px solid rgba(201,168,76,.15);
  display: flex; align-items: center; justify-content: center; font-size: 110px; }
.hero-stats { display: flex; gap: 36px; margin-top: 36px; }
.hs strong { display: block; font-size: 26px; font-weight: 900; color: var(--gold); }
.hs span { font-size: 12px; color: rgba(255,255,255,.55); }

/* ── BUTTONS ── */
.btn-g { background: var(--gold); color: var(--navy); border: none; padding: 13px 28px; border-radius: 8px;
  font-size: 14px; font-weight: 800; transition: all .2s; box-shadow: 0 4px 18px rgba(201,168,76,.4); }
.btn-g:hover { background: var(--gold-l); transform: translateY(-2px); }
.btn-o { background: transparent; color: white; border: 2px solid rgba(255,255,255,.35);
  padding: 11px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: all .2s; }
.btn-o:hover { border-color: var(--gold); color: var(--gold); }
.btn-n { background: var(--navy); color: white; border: none; padding: 10px 20px; border-radius: 8px;
  font-size: 13px; font-weight: 700; transition: all .2s; }
.btn-n:hover { background: var(--gold); color: var(--navy); }
.btn-r { background: var(--red); color: white; border: none; padding: 7px 14px; border-radius: 7px;
  font-size: 12px; font-weight: 700; transition: all .2s; }
.btn-r:hover { opacity: .85; }

/* ── QUICK CATS ── */
.qcats { background: white; padding: 28px 32px; border-bottom: 1px solid var(--border);
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.qcat { background: var(--cream); border: 1px solid var(--border); border-radius: 12px;
  padding: 14px 22px; text-align: center; cursor: pointer; transition: all .25s; min-width: 90px; border: none; }
.qcat:hover, .qcat.on { border: 1px solid var(--gold); box-shadow: 0 4px 16px rgba(201,168,76,.2); background: var(--gold-bg); transform: translateY(-2px); }
.qcat-icon { font-size: 26px; margin-bottom: 6px; }
.qcat-name { font-size: 12px; font-weight: 700; color: var(--navy); }

/* ── SECTION ── */
.sec { padding: 44px 32px; }
.sec-h { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.sec-t { font-size: 24px; font-weight: 900; color: var(--navy); }
.sec-t span { color: var(--gold); }
.see-all { background: none; border: 1px solid var(--gold); color: var(--gold);
  padding: 7px 18px; border-radius: 7px; font-size: 12px; font-weight: 700; transition: all .2s; }
.see-all:hover { background: var(--gold); color: var(--navy); }

/* ── SUBCAT GRID ── */
.subcat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px,1fr)); gap: 12px; margin-bottom: 32px; }
.subcat-card { background: white; border: 1px solid var(--border); border-radius: 12px;
  padding: 18px 14px; text-align: center; cursor: pointer; transition: all .25s; }
.subcat-card:hover, .subcat-card.on { border-color: var(--gold); background: var(--gold-bg); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(201,168,76,.2); }
.subcat-card .ic { font-size: 30px; margin-bottom: 7px; }
.subcat-card .nm { font-size: 12px; font-weight: 700; color: var(--navy); }

/* ── PRODUCTS GRID ── */
.pgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px,1fr)); gap: 20px; }
.pcard { background: white; border-radius: 14px; overflow: hidden; border: 1px solid var(--border);
  transition: all .3s; box-shadow: 0 2px 10px rgba(0,0,0,.05); position: relative; }
.pcard:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,.1); }
.pcard-img { width: 100%; height: 210px; object-fit: cover; background: #f0ede8; }
.pbadge { position: absolute; top: 10px; right: 10px; padding: 3px 10px; border-radius: 20px;
  font-size: 10px; font-weight: 800; }
.pbadge.sale { background: var(--red); color: white; }
.pbadge.new { background: var(--navy); color: white; }
.pbadge.hot { background: var(--gold); color: var(--navy); }
.pfav { position: absolute; top: 10px; left: 10px; background: white; border: none;
  width: 30px; height: 30px; border-radius: 50%; font-size: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1); transition: all .2s;
  display: flex; align-items: center; justify-content: center; }
.pfav:hover { transform: scale(1.15); }
.pinfo { padding: 14px; }
.psub { font-size: 10px; color: var(--muted); font-weight: 700; text-transform: uppercase; margin-bottom: 3px; }
.pname { font-size: 14px; font-weight: 800; color: var(--navy); margin-bottom: 7px; line-height: 1.4; }
.prating { display: flex; align-items: center; gap: 5px; margin-bottom: 8px; font-size: 11px; }
.stars { color: var(--gold); font-size: 11px; }
.rc { color: var(--muted); }
.pprice { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.pp { font-size: 19px; font-weight: 900; color: var(--navy); }
.po { font-size: 13px; color: var(--muted); text-decoration: line-through; }
.pacts { display: flex; gap: 7px; }
.add-cart { flex: 1; background: var(--navy); color: white; border: none; padding: 9px;
  border-radius: 8px; font-size: 12px; font-weight: 700; transition: all .2s; }
.add-cart:hover { background: var(--gold); color: var(--navy); }
.view-btn { background: var(--cream); border: 1px solid var(--border); color: var(--navy);
  padding: 9px 12px; border-radius: 8px; font-size: 14px; transition: all .2s; }
.view-btn:hover { border-color: var(--gold); color: var(--gold); }

/* ── PAGE HEADER ── */
.phdr { background: linear-gradient(135deg, var(--navy), #1a3a5c);
  padding: 38px 32px; text-align: center; }
.phdr h2 { font-size: 32px; font-weight: 900; color: white; margin-bottom: 6px; }
.phdr p { color: rgba(255,255,255,.65); font-size: 14px; }
.gold-line { width: 50px; height: 3px; background: var(--gold); margin: 10px auto 0; border-radius: 2px; }

/* ── PRODUCT DETAIL ── */
.pdetail { padding: 28px 32px; max-width: 1050px; margin: 0 auto; }
.bread { display: flex; gap: 7px; align-items: center; margin-bottom: 24px; font-size: 12px; color: var(--muted); flex-wrap: wrap; }
.bread button { background: none; border: none; color: var(--gold); font-size: 12px; font-family: 'Cairo',sans-serif; }
.dgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; }
.dimg { width: 100%; border-radius: 14px; object-fit: cover; height: 440px; background: #f0ede8; }
.dtag { display: inline-block; background: var(--gold); color: var(--navy);
  padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; margin-bottom: 10px; }
.dname { font-size: 28px; font-weight: 900; color: var(--navy); margin-bottom: 10px; line-height: 1.3; }
.dprice { display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; }
.dpc { font-size: 34px; font-weight: 900; color: var(--navy); }
.dpo { font-size: 18px; color: var(--muted); text-decoration: line-through; }
.dsave { background: #fef3c7; color: #d97706; padding: 2px 9px; border-radius: 6px; font-size: 11px; font-weight: 800; }
.ddesc { font-size: 14px; color: #444; line-height: 1.8; margin-bottom: 20px; background: var(--cream); padding: 14px; border-radius: 9px; }
.dmeta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
.dmi { background: var(--cream); padding: 10px 14px; border-radius: 8px; border-right: 3px solid var(--gold); }
.dml { font-size: 10px; color: var(--muted); font-weight: 700; }
.dmv { font-size: 13px; font-weight: 800; color: var(--navy); }
.dacts { display: flex; gap: 10px; margin-bottom: 16px; }
.d-addcart { flex: 1; background: var(--navy); color: white; border: none; padding: 14px;
  border-radius: 9px; font-size: 15px; font-weight: 700; transition: all .2s; }
.d-addcart:hover { background: var(--gold); color: var(--navy); }
.d-buy { background: var(--gold); color: var(--navy); border: none; padding: 14px 24px;
  border-radius: 9px; font-size: 15px; font-weight: 800; transition: all .2s; }
.d-buy:hover { background: var(--gold-l); }
.trust { display: flex; gap: 14px; flex-wrap: wrap; }
.tb { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); font-weight: 600; }

/* ── CART SIDEBAR ── */
.cover { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 200; opacity: 0; pointer-events: none; transition: opacity .3s; }
.cover.on { opacity: 1; pointer-events: all; }
.cart-sb { position: fixed; left: 0; top: 0; height: 100vh; width: 390px; background: white; z-index: 201;
  transform: translateX(-100%); transition: transform .3s cubic-bezier(.4,0,.2,1);
  display: flex; flex-direction: column; box-shadow: 4px 0 36px rgba(0,0,0,.22); }
.cart-sb.on { transform: translateX(0); }
.cart-hdr { background: var(--navy); padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; }
.cart-hdr h3 { color: white; font-size: 16px; font-weight: 800; }
.cart-cls { background: none; border: none; color: white; font-size: 20px; }
.cart-body { flex: 1; overflow-y: auto; padding: 18px; }
.ci { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.ci-img { width: 65px; height: 65px; object-fit: cover; border-radius: 8px; background: #f0ede8; }
.ci-inf { flex: 1; }
.ci-nm { font-size: 13px; font-weight: 800; color: var(--navy); margin-bottom: 3px; }
.ci-pr { font-size: 14px; font-weight: 900; color: var(--gold); }
.qty-row { display: flex; align-items: center; gap: 8px; margin-top: 7px; }
.qb { background: var(--cream); border: 1px solid var(--border); width: 26px; height: 26px;
  border-radius: 6px; font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; transition: all .2s; }
.qb:hover { background: var(--gold); color: var(--navy); border-color: var(--gold); }
.qn { font-size: 14px; font-weight: 800; min-width: 18px; text-align: center; }
.ci-rm { background: none; border: none; color: var(--red); font-size: 17px; align-self: flex-start; }
.cart-ft { padding: 18px 22px; border-top: 1px solid var(--border); background: var(--cream); }
.cart-tot { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.cart-tot span { font-size: 14px; color: var(--muted); }
.cart-tot strong { font-size: 20px; font-weight: 900; color: var(--navy); }
.free-ship { font-size: 11px; color: var(--green); text-align: center; margin-bottom: 14px; font-weight: 700; }
.btn-co { width: 100%; background: var(--gold); color: var(--navy); border: none; padding: 14px;
  border-radius: 9px; font-size: 15px; font-weight: 900; transition: all .2s; box-shadow: 0 4px 14px rgba(201,168,76,.4); }
.btn-co:hover { background: var(--gold-l); }
.cart-empty { text-align: center; padding: 56px 16px; color: var(--muted); }
.cart-empty .ei { font-size: 56px; margin-bottom: 12px; }

/* ── PROMO BANNER ── */
.promo { background: linear-gradient(135deg,var(--navy),#1a3a5c); margin: 0 32px;
  border-radius: 18px; padding: 36px; display: flex; justify-content: space-between;
  align-items: center; flex-wrap: wrap; gap: 16px; }
.promo-t small { color: var(--gold); font-weight: 800; font-size: 11px; letter-spacing: 2px; display: block; margin-bottom: 6px; }
.promo-t h3 { color: white; font-size: 26px; font-weight: 900; }
.promo-t h3 span { color: var(--gold); }
.promo-t p { color: rgba(255,255,255,.6); font-size: 13px; margin-top: 4px; }

/* ── FOOTER ── */
.ftr { background: var(--navy); color: white; padding: 44px 32px 20px; margin-top: 56px; }
.ftr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap: 28px; margin-bottom: 36px; }
.ftr-logo { font-size: 22px; font-weight: 900; color: var(--gold); margin-bottom: 10px; }
.ftr p, .ftr a { font-size: 12px; color: rgba(255,255,255,.55); display: block; margin-bottom: 7px; text-decoration: none; }
.ftr a:hover { color: var(--gold); }
.ftr h4 { font-size: 13px; font-weight: 800; color: var(--gold); margin-bottom: 14px; }
.ftr-btm { border-top: 1px solid rgba(255,255,255,.1); padding-top: 16px; text-align: center; font-size: 11px; color: rgba(255,255,255,.3); }
.socials { display: flex; gap: 10px; margin-top: 14px; }
.soc { width: 34px; height: 34px; background: rgba(255,255,255,.08); border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-size: 17px; cursor: pointer; transition: all .2s; }
.soc:hover { background: var(--gold); }

/* ── TOAST ── */
.toast { position: fixed; bottom: 22px; left: 22px; z-index: 400; background: var(--navy);
  color: white; padding: 12px 18px; border-radius: 9px; font-size: 13px; font-weight: 700;
  box-shadow: 0 8px 28px rgba(0,0,0,.3); border-right: 4px solid var(--gold);
  transform: translateY(70px); opacity: 0; transition: all .3s; }
.toast.on { transform: translateY(0); opacity: 1; }

/* ════════════════════════════════════════
   ADMIN DASHBOARD
════════════════════════════════════════ */
.admin-wrap { display: flex; min-height: 100vh; background: #f0f4f8; direction: rtl; }

/* sidebar */
.a-side { width: 240px; min-height: 100vh; background: var(--navy); color: white;
  display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow-y: auto; flex-shrink: 0; }
.a-side-logo { padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,.1); }
.a-side-logo h2 { font-size: 16px; font-weight: 900; color: var(--gold); }
.a-side-logo small { font-size: 10px; color: rgba(255,255,255,.4); letter-spacing: 1px; }
.a-nav { flex: 1; padding: 16px 12px; }
.a-nav-item { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 9px;
  color: rgba(255,255,255,.65); font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all .2s; margin-bottom: 3px; border: none; background: none; width: 100%; text-align: right; }
.a-nav-item:hover { background: rgba(255,255,255,.07); color: white; }
.a-nav-item.on { background: var(--gold); color: var(--navy); font-weight: 800; }
.a-nav-item .ni { font-size: 17px; width: 22px; text-align: center; }
.a-exit { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,.1); }
.a-exit button { width: 100%; padding: 10px; background: rgba(231,76,60,.15); border: 1px solid rgba(231,76,60,.3);
  color: #e74c3c; border-radius: 8px; font-size: 13px; font-weight: 700; transition: all .2s; }
.a-exit button:hover { background: var(--red); color: white; }

/* main content */
.a-main { flex: 1; overflow-y: auto; }
.a-topbar { background: white; border-bottom: 1px solid #e2e8f0; padding: 0 28px; height: 60px;
  display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
.a-topbar h3 { font-size: 18px; font-weight: 900; color: var(--navy); }
.a-topbar-info { display: flex; align-items: center; gap: 14px; font-size: 12px; color: var(--muted); }
.a-content { padding: 24px 28px; }

/* stat cards */
.stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; margin-bottom: 28px; }
.stat-card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;
  box-shadow: 0 1px 4px rgba(0,0,0,.04); }
.stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.stat-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.stat-val { font-size: 28px; font-weight: 900; color: var(--navy); }
.stat-lbl { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 2px; }
.stat-chg { font-size: 11px; font-weight: 700; margin-top: 8px; }
.chg-up { color: var(--green); } .chg-dn { color: var(--red); }

/* tables */
.a-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.04); }
.a-card-hdr { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
.a-card-hdr h4 { font-size: 15px; font-weight: 800; color: var(--navy); }
.tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
.tbl th { background: #f8fafc; padding: 11px 16px; text-align: right; font-weight: 700;
  color: var(--muted); border-bottom: 1px solid #e2e8f0; font-size: 11px; white-space: nowrap; }
.tbl td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.tbl tr:last-child td { border-bottom: none; }
.tbl tr:hover td { background: #f8fafc; }
.tbl-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; background: #f0ede8; }
.status { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; }
.s-new { background: #e8f5e9; color: #2e7d32; }
.s-proc { background: #e3f2fd; color: #1565c0; }
.s-ship { background: #fff3e0; color: #e65100; }
.s-done { background: #f3e5f5; color: #6a1b9a; }
.s-cancel { background: #ffebee; color: #c62828; }

/* forms */
.a-form { display: grid; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fld label { display: block; font-size: 12px; font-weight: 700; color: var(--navy); margin-bottom: 5px; }
.fld input, .fld select, .fld textarea {
  width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; outline: none; transition: border .2s; background: white; color: var(--text); }
.fld input:focus, .fld select:focus, .fld textarea:focus { border-color: var(--gold); }
.fld textarea { resize: vertical; min-height: 80px; }
.btn-save { background: var(--gold); color: var(--navy); border: none; padding: 12px 28px;
  border-radius: 9px; font-size: 14px; font-weight: 800; transition: all .2s; }
.btn-save:hover { background: var(--gold-l); }

/* login */
.login-wrap { min-height: 100vh; background: linear-gradient(135deg,var(--navy),#1a3a5c);
  display: flex; align-items: center; justify-content: center; padding: 20px; }
.login-box { background: white; border-radius: 20px; padding: 44px; width: 100%; max-width: 400px;
  box-shadow: 0 24px 60px rgba(0,0,0,.3); text-align: center; }
.login-logo { font-size: 28px; font-weight: 900; color: var(--gold); margin-bottom: 4px; }
.login-sub { font-size: 12px; color: var(--muted); margin-bottom: 32px; }
.login-box .fld { text-align: right; margin-bottom: 14px; }
.login-box input { text-align: right; }
.login-err { background: #ffebee; color: var(--red); padding: 10px; border-radius: 8px; font-size: 12px; font-weight: 700; margin-bottom: 14px; }
.btn-login { width: 100%; background: var(--navy); color: white; border: none; padding: 14px;
  border-radius: 10px; font-size: 15px; font-weight: 800; margin-top: 6px; transition: all .2s; }
.btn-login:hover { background: var(--gold); color: var(--navy); }
.login-hint { font-size: 11px; color: var(--muted); margin-top: 16px; }

/* mini chart bars */
.mini-bars { display: flex; align-items: flex-end; gap: 4px; height: 50px; }
.mbar { flex: 1; background: var(--gold); border-radius: 3px 3px 0 0; opacity: .7; transition: opacity .2s; }
.mbar:hover { opacity: 1; }

/* modal */
.modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 300;
  display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal { background: white; border-radius: 16px; padding: 28px; width: 100%; max-width: 560px;
  box-shadow: 0 24px 60px rgba(0,0,0,.25); max-height: 90vh; overflow-y: auto; }
.modal-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.modal-hdr h4 { font-size: 17px; font-weight: 900; color: var(--navy); }
.modal-cls { background: none; border: none; font-size: 22px; color: var(--muted); }

/* search bar */
.srch { display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9px; padding: 8px 14px; margin-bottom: 16px; }
.srch input { flex: 1; background: none; border: none; outline: none; font-size: 13px; font-family: 'Cairo',sans-serif; }

/* chips */
.chip { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; background: var(--gold-bg); color: var(--navy); margin: 2px; }

@media(max-width:768px){
  .nb-main { padding: 0 14px; }
  .nb-links { display: none; }
  .hero { padding: 36px 18px; min-height: 340px; }
  .hero h1 { font-size: 30px; }
  .hero-deco { display: none; }
  .sec { padding: 28px 14px; }
  .pgrid { grid-template-columns: repeat(2,1fr); gap: 12px; }
  .dgrid { grid-template-columns: 1fr; }
  .cart-sb { width: 100%; }
  .promo { margin: 0 14px; padding: 24px; }
  .a-side { width: 200px; }
  .a-content { padding: 16px; }
  .stat-grid { grid-template-columns: repeat(2,1fr); }
  .form-row { grid-template-columns: 1fr; }
}
`;

// ═══════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════
const initProducts = [
  { id:1, name:"قميص كلاسيك رجالي", price:299, oldPrice:450, cat:"أزياء", sub:"رجالي", img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", badge:"جديد", rating:4.5, reviews:32, stock:45 },
  { id:2, name:"بنطلون كاجوال رجالي", price:380, oldPrice:null, cat:"أزياء", sub:"رجالي", img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", badge:null, rating:4.2, reviews:18, stock:28 },
  { id:3, name:"جاكيت شتوي رجالي", price:850, oldPrice:1200, cat:"أزياء", sub:"رجالي", img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80", badge:"خصم 30%", rating:4.8, reviews:54, stock:12 },
  { id:4, name:"فستان سهرة أنيق", price:650, oldPrice:900, cat:"أزياء", sub:"حريمي", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80", badge:"الأكثر مبيعاً", rating:4.9, reviews:87, stock:20 },
  { id:5, name:"عباية مطرزة فاخرة", price:780, oldPrice:null, cat:"أزياء", sub:"حريمي", img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", badge:"جديد", rating:4.7, reviews:41, stock:15 },
  { id:6, name:"طقم أطفال ملون", price:180, oldPrice:250, cat:"أزياء", sub:"أطفال", img:"https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80", badge:"خصم 28%", rating:4.6, reviews:63, stock:60 },
  { id:7, name:"ملاية قطن مصري فاخر", price:420, oldPrice:600, cat:"مفروشات", sub:"ملايات", img:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", badge:"الأكثر مبيعاً", rating:4.8, reviews:112, stock:80 },
  { id:8, name:"طقم أغطية سرير كامل", price:950, oldPrice:1400, cat:"مفروشات", sub:"أغطية سرير", img:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80", badge:"خصم 32%", rating:4.9, reviews:78, stock:35 },
  { id:9, name:"طقم فوط حمام 6 قطع", price:320, oldPrice:480, cat:"مفروشات", sub:"فوط ومناشف", img:"https://images.unsplash.com/photo-1563293958-7b9b4cca4f77?w=400&q=80", badge:"خصم 33%", rating:4.6, reviews:94, stock:55 },
  { id:10, name:"دفاية أوزة فاخرة", price:1200, oldPrice:1800, cat:"مفروشات", sub:"دفايات وبطاطين", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", badge:"خصم 33%", rating:4.9, reviews:143, stock:18 },
  { id:11, name:"بطانية شتوي ثقيل", price:450, oldPrice:null, cat:"مفروشات", sub:"دفايات وبطاطين", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", badge:"جديد", rating:4.7, reviews:66, stock:40 },
  { id:12, name:"قماش تغطية كنبة مخمل", price:380, oldPrice:550, cat:"مفروشات", sub:"أقمشة كنبات", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", badge:"خصم 31%", rating:4.5, reviews:39, stock:25 },
];

const initOrders = [
  { id:"#1001", customer:"محمد أحمد", phone:"01012345678", items:"ملاية قطن × 2", total:840, status:"تم التسليم", date:"2025-03-01" },
  { id:"#1002", customer:"فاطمة علي", phone:"01098765432", items:"فستان سهرة × 1", total:650, status:"جاري الشحن", date:"2025-03-05" },
  { id:"#1003", customer:"عمر حسين", phone:"01155443322", items:"دفاية أوزة × 1", total:1200, status:"قيد التجهيز", date:"2025-03-07" },
  { id:"#1004", customer:"نور إبراهيم", phone:"01234567890", items:"طقم أغطية × 1، فوط × 1", total:1270, status:"جديد", date:"2025-03-10" },
  { id:"#1005", customer:"خالد مصطفى", phone:"01511223344", items:"جاكيت شتوي × 2", total:1700, status:"ملغي", date:"2025-03-02" },
];

const initCustomers = [
  { id:1, name:"محمد أحمد", email:"m.ahmed@gmail.com", phone:"01012345678", orders:5, total:4200, joined:"2024-11-01" },
  { id:2, name:"فاطمة علي", email:"fatma@gmail.com", phone:"01098765432", orders:3, total:2100, joined:"2024-12-15" },
  { id:3, name:"عمر حسين", email:"omar@gmail.com", phone:"01155443322", orders:8, total:7600, joined:"2024-10-05" },
  { id:4, name:"نور إبراهيم", email:"nour@gmail.com", phone:"01234567890", orders:2, total:1900, joined:"2025-01-20" },
  { id:5, name:"خالد مصطفى", email:"khaled@gmail.com", phone:"01511223344", orders:1, total:850, joined:"2025-02-10" },
];

const subcatsMap = {
  "أزياء": [
    { key:"رجالي", icon:"👔" }, { key:"حريمي", icon:"👗" }, { key:"أطفال", icon:"🧒" }
  ],
  "مفروشات": [
    { key:"ملايات", icon:"🛏️" }, { key:"أغطية سرير", icon:"🪵" },
    { key:"فوط ومناشف", icon:"🧴" }, { key:"دفايات وبطاطين", icon:"🌡️" }, { key:"أقمشة كنبات", icon:"🛋️" }
  ],
};

const orderStatuses = ["جديد","قيد التجهيز","جاري الشحن","تم التسليم","ملغي"];
const statusClass = { "جديد":"s-new","قيد التجهيز":"s-proc","جاري الشحن":"s-ship","تم التسليم":"s-done","ملغي":"s-cancel" };

// ═══════════════════════════════════════════════════════
//  SMALL HELPERS
// ═══════════════════════════════════════════════════════
const Stars = ({r}) => {
  const f = Math.floor(r); const h = r%1>=.5;
  return <span className="stars">{"★".repeat(f)}{h?"½":""}</span>;
};

// ═══════════════════════════════════════════════════════
//  STORE COMPONENTS
// ═══════════════════════════════════════════════════════
function ProductCard({p, onAdd, onView, favs, onFav}) {
  const bc = p.badge==="جديد"?"new":p.badge==="الأكثر مبيعاً"?"hot":"sale";
  return (
    <div className="pcard">
      <img className="pcard-img" src={p.img} alt={p.name}/>
      {p.badge && <span className={`pbadge ${bc}`}>{p.badge}</span>}
      <button className="pfav" onClick={()=>onFav(p.id)}>{favs.includes(p.id)?"❤️":"🤍"}</button>
      <div className="pinfo">
        <div className="psub">{p.cat} · {p.sub}</div>
        <div className="pname">{p.name}</div>
        <div className="prating"><Stars r={p.rating}/><span className="rc">({p.reviews})</span></div>
        <div className="pprice">
          <span className="pp">{p.price} ج</span>
          {p.oldPrice && <span className="po">{p.oldPrice} ج</span>}
        </div>
        <div className="pacts">
          <button className="add-cart" onClick={()=>onAdd(p)}>🛒 أضف للكارت</button>
          <button className="view-btn" onClick={()=>onView(p)}>👁</button>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({open, onClose, cart, onQty, onRemove}) {
  const total = cart.reduce((s,i)=>s+i.price*i.qty, 0);
  return (
    <>
      <div className={`cover ${open?"on":""}`} onClick={onClose}/>
      <div className={`cart-sb ${open?"on":""}`}>
        <div className="cart-hdr">
          <h3>🛒 عربة الشراء ({cart.length})</h3>
          <button className="cart-cls" onClick={onClose}>✕</button>
        </div>
        <div className="cart-body">
          {cart.length===0 ? (
            <div className="cart-empty"><div className="ei">🛒</div><p>عربتك فاضية!</p></div>
          ) : cart.map(item=>(
            <div className="ci" key={item.id}>
              <img className="ci-img" src={item.img} alt={item.name}/>
              <div className="ci-inf">
                <div className="ci-nm">{item.name}</div>
                <div className="ci-pr">{item.price} جنيه</div>
                <div className="qty-row">
                  <button className="qb" onClick={()=>onQty(item.id,-1)}>−</button>
                  <span className="qn">{item.qty}</span>
                  <button className="qb" onClick={()=>onQty(item.id,1)}>+</button>
                </div>
              </div>
              <button className="ci-rm" onClick={()=>onRemove(item.id)}>🗑</button>
            </div>
          ))}
        </div>
        {cart.length>0 && (
          <div className="cart-ft">
            <div className="cart-tot"><span>الإجمالي</span><strong>{total.toLocaleString()} ج</strong></div>
            <div className="free-ship">✅ شحن مجاني لطلبات فوق 500 جنيه</div>
            <button className="btn-co">إتمام الشراء ←</button>
          </div>
        )}
      </div>
    </>
  );
}

function Navbar({page, setPage, cartCount, onCart}) {
  return (
    <nav className="nb">
      <div className="nb-top">🚚 شحن مجاني لطلبات فوق 500 جنيه — عروض يومية حصرية!</div>
      <div className="nb-main">
        <div className="nb-links">
          {["الرئيسية","أزياء","مفروشات"].map(p=>(
            <button key={p} className={`nb-link ${page===p?"on":""}`} onClick={()=>setPage(p)}>{p}</button>
          ))}
        </div>
        <div className="nb-logo" onClick={()=>setPage("الرئيسية")}>
          🏪 مملكة الجملة
          <small>mamlakat aljumla</small>
        </div>
        <div className="nb-acts">
          <button className="ib">🔍</button>
          <button className="ib" onClick={onCart} style={{position:"relative"}}>
            🛒{cartCount>0&&<span className="badge">{cartCount}</span>}
          </button>
          <button className="ib">👤</button>
        </div>
      </div>
    </nav>
  );
}

function HomePage({products, onAdd, onView, favs, onFav, setPage}) {
  const featured = products.filter(p=>p.badge).slice(0,8);
  return (
    <>
      <div className="hero">
        <div className="hero-c">
          <span className="hero-tag">✨ مجموعة 2025 وصلت</span>
          <h1>مملكة <span>الجملة</span><br/>بأفضل الأسعار</h1>
          <p>أجود الأزياء والمفروشات بأسعار الجملة لبيتك وأسرتك في كل مكان</p>
          <div className="hero-btns">
            <button className="btn-g" onClick={()=>setPage("أزياء")}>تسوق الأزياء</button>
            <button className="btn-o" onClick={()=>setPage("مفروشات")}>تسوق المفروشات</button>
          </div>
          <div className="hero-stats">
            <div className="hs"><strong>+5000</strong><span>منتج</span></div>
            <div className="hs"><strong>+20K</strong><span>عميل</span></div>
            <div className="hs"><strong>4.9★</strong><span>تقييم</span></div>
          </div>
        </div>
        <div className="hero-deco">🛍️</div>
      </div>

      <div className="qcats">
        {[
          {icon:"👔",label:"رجالي",page:"أزياء"},
          {icon:"👗",label:"حريمي",page:"أزياء"},
          {icon:"🧒",label:"أطفال",page:"أزياء"},
          {icon:"🛏️",label:"ملايات",page:"مفروشات"},
          {icon:"🧴",label:"فوط",page:"مفروشات"},
          {icon:"🌡️",label:"دفايات",page:"مفروشات"},
          {icon:"🛋️",label:"أقمشة كنبات",page:"مفروشات"},
        ].map(c=>(
          <button key={c.label} className="qcat" onClick={()=>setPage(c.page)}>
            <div className="qcat-icon">{c.icon}</div>
            <div className="qcat-name">{c.label}</div>
          </button>
        ))}
      </div>

      <div className="sec">
        <div className="sec-h">
          <div className="sec-t">🔥 المنتجات <span>المميزة</span></div>
        </div>
        <div className="pgrid">
          {featured.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onView={onView} favs={favs} onFav={onFav}/>)}
        </div>
      </div>

      <div className="promo">
        <div className="promo-t">
          <small>⚡ عرض محدود</small>
          <h3>خصومات تصل لـ <span>40%</span></h3>
          <p>على جميع منتجات المفروشات هذا الأسبوع</p>
        </div>
        <button className="btn-g" style={{padding:"16px 36px",fontSize:"15px"}}>اشتري دلوقت →</button>
      </div>

      <div className="sec">
        <div className="sec-h">
          <div className="sec-t">🛍️ جميع <span>المنتجات</span></div>
        </div>
        <div className="pgrid">
          {products.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onView={onView} favs={favs} onFav={onFav}/>)}
        </div>
      </div>
    </>
  );
}

function CatPage({cat, products, onAdd, onView, favs, onFav}) {
  const subs = subcatsMap[cat];
  const [active, setActive] = useState(subs[0].key);
  const filtered = products.filter(p=>p.cat===cat && p.sub===active);
  return (
    <>
      <div className="phdr">
        <h2>{cat==="أزياء"?"👗":"🛏️"} {cat}</h2>
        <p>{cat==="أزياء"?"أحدث صيحات الموضة لجميع أفراد الأسرة":"أجود المفروشات لبيتك الجميل"}</p>
        <div className="gold-line"/>
      </div>
      <div className="sec">
        <div className="subcat-grid">
          {subs.map(s=>(
            <button key={s.key} className={`subcat-card ${active===s.key?"on":""}`} onClick={()=>setActive(s.key)}>
              <div className="ic">{s.icon}</div><div className="nm">{s.key}</div>
            </button>
          ))}
        </div>
        <div className="sec-h">
          <div className="sec-t">{subs.find(s=>s.key===active)?.icon} <span>{active}</span></div>
          <span style={{fontSize:12,color:"var(--muted)",fontWeight:600}}>{filtered.length} منتج</span>
        </div>
        <div className="pgrid">
          {filtered.map(p=><ProductCard key={p.id} p={p} onAdd={onAdd} onView={onView} favs={favs} onFav={onFav}/>)}
        </div>
      </div>
    </>
  );
}

function ProductDetail({p, onAdd, onBack}) {
  const disc = p.oldPrice ? Math.round((1-p.price/p.oldPrice)*100) : 0;
  return (
    <div className="pdetail">
      <div className="bread">
        <button onClick={()=>onBack(null)}>الرئيسية</button>›
        <span>{p.cat}</span>›<span>{p.sub}</span>›<span style={{color:"var(--navy)",fontWeight:700}}>{p.name}</span>
      </div>
      <div className="dgrid">
        <div><img className="dimg" src={p.img} alt={p.name}/></div>
        <div>
          <span className="dtag">{p.sub}</span>
          <div className="dname">{p.name}</div>
          <div className="prating" style={{marginBottom:16}}><Stars r={p.rating}/><span className="rc" style={{marginRight:6}}>({p.reviews} تقييم)</span></div>
          <div className="dprice">
            <span className="dpc">{p.price} جنيه</span>
            {p.oldPrice&&<><span className="dpo">{p.oldPrice} جنيه</span><span className="dsave">وفر {disc}%</span></>}
          </div>
          <div className="ddesc">منتج عالي الجودة مصنوع من أجود الخامات. مثالي للاستخدام اليومي ويتميز بمتانة عالية وتصميم أنيق يناسب جميع الأذواق.</div>
          <div className="dmeta">
            <div className="dmi"><div className="dml">الحالة</div><div className="dmv">✅ متاح ({p.stock} قطعة)</div></div>
            <div className="dmi"><div className="dml">الشحن</div><div className="dmv">🚚 2-3 أيام</div></div>
            <div className="dmi"><div className="dml">الضمان</div><div className="dmv">↩️ إرجاع 14 يوم</div></div>
            <div className="dmi"><div className="dml">الدفع</div><div className="dmv">💳 متعدد الطرق</div></div>
          </div>
          <div className="dacts">
            <button className="d-addcart" onClick={()=>onAdd(p)}>🛒 أضف للكارت</button>
            <button className="d-buy" onClick={()=>onAdd(p)}>اشتري الآن</button>
          </div>
          <div className="trust">
            <span className="tb">🔒 دفع آمن</span>
            <span className="tb">📦 شحن سريع</span>
            <span className="tb">✅ جودة مضمونة</span>
            <span className="tb">↩️ إرجاع سهل</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreFooter({setPage}) {
  return (
    <footer className="ftr">
      <div className="ftr-grid">
        <div>
          <div className="ftr-logo">🏪 مملكة الجملة</div>
          <p>متجرك الأول للأزياء والمفروشات بأسعار الجملة في مصر.</p>
          <div className="socials">{["📘","📸","🎵","▶️"].map((s,i)=><div key={i} className="soc">{s}</div>)}</div>
        </div>
        <div>
          <h4>تسوق</h4>
          <a onClick={()=>setPage("الرئيسية")}>الرئيسية</a>
          <a onClick={()=>setPage("أزياء")}>الأزياء</a>
          <a onClick={()=>setPage("مفروشات")}>المفروشات</a>
        </div>
        <div>
          <h4>خدمة العملاء</h4>
          <a>تواصل معنا</a><a>سياسة الإرجاع</a><a>تتبع طلبك</a><a>الأسئلة الشائعة</a>
        </div>
        <div>
          <h4>تواصل معنا</h4>
          <p>📞 01000000000</p>
          <p>📧 info@mamlakataljumla.com</p>
          <p>📍 القاهرة، مصر</p>
          <p>🕐 9 ص - 9 م يومياً</p>
        </div>
      </div>
      <div className="ftr-btm">© 2025 مملكة الجملة — جميع الحقوق محفوظة ❤️</div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════
//  ADMIN COMPONENTS
// ═══════════════════════════════════════════════════════
function AdminLogin({onLogin}) {
  const [u,setU]=useState(""); const [pw,setPw]=useState(""); const [err,setErr]=useState(false);
  const submit = () => {
    if(u==="admin" && pw==="admin123") onLogin();
    else setErr(true);
  };
  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo">🏪 مملكة الجملة</div>
        <div className="login-sub">لوحة تحكم المشرف</div>
        {err && <div className="login-err">❌ اسم المستخدم أو كلمة المرور غلط</div>}
        <div className="fld"><label>اسم المستخدم</label><input value={u} onChange={e=>setU(e.target.value)} placeholder="admin"/></div>
        <div className="fld"><label>كلمة المرور</label><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••"/></div>
        <button className="btn-login" onClick={submit}>دخول →</button>
        <div className="login-hint">💡 للتجربة: admin / admin123</div>
      </div>
    </div>
  );
}

function StatCard({icon,val,lbl,chg,color}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div><div className="stat-val">{val}</div><div className="stat-lbl">{lbl}</div></div>
        <div className="stat-icon" style={{background:color+"22"}}>{icon}</div>
      </div>
      {chg && <div className={`stat-chg ${chg>0?"chg-up":"chg-dn"}`}>{chg>0?"▲":"▼"} {Math.abs(chg)}% من الشهر الماضي</div>}
    </div>
  );
}

function AdminOverview({products, orders, customers}) {
  const totalRev = orders.filter(o=>o.status==="تم التسليم").reduce((s,o)=>s+o.total,0);
  const newOrds = orders.filter(o=>o.status==="جديد").length;
  const bars = [40,65,50,80,70,90,75,60,85,95,70,88];
  return (
    <div>
      <div className="stat-grid">
        <StatCard icon="💰" val={`${totalRev.toLocaleString()} ج`} lbl="إجمالي الإيرادات" chg={12} color="#27ae60"/>
        <StatCard icon="📦" val={orders.length} lbl="إجمالي الطلبات" chg={8} color="#2980b9"/>
        <StatCard icon="👥" val={customers.length} lbl="العملاء" chg={5} color="#9b59b6"/>
        <StatCard icon="🛍️" val={products.length} lbl="المنتجات" chg={3} color="#e67e22"/>
        <StatCard icon="🆕" val={newOrds} lbl="طلبات جديدة" color="#e74c3c"/>
        <StatCard icon="⭐" val="4.8" lbl="متوسط التقييم" chg={2} color="#C9A84C"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <div className="a-card">
          <div className="a-card-hdr"><h4>📈 المبيعات (آخر 12 شهر)</h4></div>
          <div style={{padding:"20px",display:"flex",alignItems:"flex-end",gap:4,height:100}}>
            {bars.map((h,i)=>(
              <div key={i} className="mbar" style={{height:`${h}%`}} title={`شهر ${i+1}`}/>
            ))}
          </div>
        </div>
        <div className="a-card">
          <div className="a-card-hdr"><h4>📊 توزيع المنتجات</h4></div>
          <div style={{padding:"20px"}}>
            {[["أزياء رجالي","30%","#C9A84C"],["أزياء حريمي","25%","#0D1B2A"],["مفروشات","35%","#27ae60"],["أطفال","10%","#e67e22"]].map(([l,v,c])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:32,height:8,borderRadius:4,background:c}}/>
                <span style={{fontSize:12,flex:1,fontWeight:600,color:"var(--navy)"}}>{l}</span>
                <span style={{fontSize:12,fontWeight:800,color:c}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-hdr"><h4>🕐 آخر الطلبات</h4></div>
        <table className="tbl">
          <thead><tr><th>رقم الطلب</th><th>العميل</th><th>المنتجات</th><th>الإجمالي</th><th>الحالة</th><th>التاريخ</th></tr></thead>
          <tbody>
            {orders.slice(0,5).map(o=>(
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td>{o.customer}</td>
                <td style={{color:"var(--muted)",fontSize:12}}>{o.items}</td>
                <td><strong style={{color:"var(--navy)"}}>{o.total.toLocaleString()} ج</strong></td>
                <td><span className={`status ${statusClass[o.status]}`}>{o.status}</span></td>
                <td style={{color:"var(--muted)",fontSize:12}}>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminProducts({products, setProducts}) {
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(false);
  const [editing,setEditing]=useState(null);
  const [form,setForm]=useState({name:"",price:"",oldPrice:"",cat:"أزياء",sub:"رجالي",stock:"",badge:"",img:""});

  const filtered = products.filter(p=>p.name.includes(search)||p.cat.includes(search)||p.sub.includes(search));

  const openAdd = () => { setEditing(null); setForm({name:"",price:"",oldPrice:"",cat:"أزياء",sub:"رجالي",stock:"50",badge:"",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"}); setModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({name:p.name,price:p.price,oldPrice:p.oldPrice||"",cat:p.cat,sub:p.sub,stock:p.stock,badge:p.badge||"",img:p.img}); setModal(true); };
  const save = () => {
    if(!form.name||!form.price) return;
    if(editing) {
      setProducts(ps=>ps.map(p=>p.id===editing?{...p,...form,price:+form.price,oldPrice:form.oldPrice?+form.oldPrice:null,stock:+form.stock,badge:form.badge||null}:p));
    } else {
      setProducts(ps=>[...ps,{...form,id:Date.now(),price:+form.price,oldPrice:form.oldPrice?+form.oldPrice:null,stock:+form.stock,badge:form.badge||null,rating:4.5,reviews:0}]);
    }
    setModal(false);
  };
  const del = (id) => { if(window.confirm("هتحذف المنتج ده؟")) setProducts(ps=>ps.filter(p=>p.id!==id)); };

  const subs = form.cat==="أزياء" ? ["رجالي","حريمي","أطفال"] : ["ملايات","أغطية سرير","فوط ومناشف","دفايات وبطاطين","أقمشة كنبات"];

  return (
    <div>
      <div className="a-card">
        <div className="a-card-hdr">
          <h4>🛍️ المنتجات ({products.length})</h4>
          <button className="btn-save" onClick={openAdd}>+ إضافة منتج</button>
        </div>
        <div style={{padding:"16px 20px 0"}}>
          <div className="srch"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث في المنتجات..."/></div>
        </div>
        <table className="tbl">
          <thead><tr><th>صورة</th><th>اسم المنتج</th><th>التصنيف</th><th>السعر</th><th>المخزون</th><th>التقييم</th><th>إجراءات</th></tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td><img className="tbl-img" src={p.img} alt={p.name}/></td>
                <td><strong style={{fontSize:13}}>{p.name}</strong>{p.badge&&<><br/><span className="chip">{p.badge}</span></>}</td>
                <td><span style={{fontSize:12,color:"var(--muted)"}}>{p.cat} › {p.sub}</span></td>
                <td>
                  <strong style={{color:"var(--navy)"}}>{p.price.toLocaleString()} ج</strong>
                  {p.oldPrice&&<><br/><span style={{fontSize:11,color:"var(--muted)",textDecoration:"line-through"}}>{p.oldPrice} ج</span></>}
                </td>
                <td><span style={{color:p.stock<20?"var(--red)":"var(--green)",fontWeight:700,fontSize:13}}>{p.stock}</span></td>
                <td><Stars r={p.rating}/> <span style={{fontSize:11,color:"var(--muted)"}}>({p.reviews})</span></td>
                <td>
                  <div style={{display:"flex",gap:6}}>
                    <button className="btn-n" style={{padding:"5px 12px",fontSize:12}} onClick={()=>openEdit(p)}>✏️ تعديل</button>
                    <button className="btn-r" onClick={()=>del(p.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <div className="modal-hdr">
              <h4>{editing?"تعديل المنتج":"إضافة منتج جديد"}</h4>
              <button className="modal-cls" onClick={()=>setModal(false)}>✕</button>
            </div>
            <div className="a-form">
              <div className="fld"><label>اسم المنتج *</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="اسم المنتج"/></div>
              <div className="form-row">
                <div className="fld"><label>السعر الحالي (ج) *</label><input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="0"/></div>
                <div className="fld"><label>السعر القديم (ج)</label><input type="number" value={form.oldPrice} onChange={e=>setForm({...form,oldPrice:e.target.value})} placeholder="اختياري"/></div>
              </div>
              <div className="form-row">
                <div className="fld"><label>التصنيف الرئيسي</label>
                  <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value,sub:e.target.value==="أزياء"?"رجالي":"ملايات"})}>
                    <option>أزياء</option><option>مفروشات</option>
                  </select>
                </div>
                <div className="fld"><label>التصنيف الفرعي</label>
                  <select value={form.sub} onChange={e=>setForm({...form,sub:e.target.value})}>
                    {subs.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="fld"><label>المخزون</label><input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} placeholder="0"/></div>
                <div className="fld"><label>الشارة (اختياري)</label>
                  <select value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}>
                    <option value="">بدون</option>
                    <option>جديد</option><option>الأكثر مبيعاً</option><option>خصم 30%</option>
                  </select>
                </div>
              </div>
              <div className="fld"><label>رابط الصورة</label><input value={form.img} onChange={e=>setForm({...form,img:e.target.value})} placeholder="https://..."/></div>
              <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:4}}>
                <button className="btn-r" onClick={()=>setModal(false)}>إلغاء</button>
                <button className="btn-save" onClick={save}>{editing?"حفظ التعديلات":"إضافة المنتج"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminOrders({orders, setOrders}) {
  const [filter,setFilter]=useState("الكل");
  const statuses=["الكل",...orderStatuses];
  const filtered = filter==="الكل" ? orders : orders.filter(o=>o.status===filter);
  const changeStatus = (id,st) => setOrders(os=>os.map(o=>o.id===id?{...o,status:st}:o));
  return (
    <div>
      <div className="a-card">
        <div className="a-card-hdr"><h4>📦 إدارة الطلبات ({orders.length})</h4></div>
        <div style={{padding:"12px 20px",display:"flex",gap:8,flexWrap:"wrap"}}>
          {statuses.map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              style={{padding:"6px 14px",borderRadius:20,border:"1px solid",fontSize:12,fontWeight:700,
                background:filter===s?"var(--gold)":"white",color:filter===s?"var(--navy)":"var(--muted)",
                borderColor:filter===s?"var(--gold)":"var(--border)",cursor:"pointer"}}>
              {s} {s!=="الكل"&&`(${orders.filter(o=>o.status===s).length})`}
            </button>
          ))}
        </div>
        <table className="tbl">
          <thead><tr><th>رقم الطلب</th><th>العميل</th><th>المنتجات</th><th>الإجمالي</th><th>الحالة</th><th>التاريخ</th><th>تغيير الحالة</th></tr></thead>
          <tbody>
            {filtered.map(o=>(
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td>
                  <strong style={{fontSize:13}}>{o.customer}</strong>
                  <div style={{fontSize:11,color:"var(--muted)"}}>{o.phone}</div>
                </td>
                <td style={{color:"var(--muted)",fontSize:12,maxWidth:160}}>{o.items}</td>
                <td><strong style={{color:"var(--navy)"}}>{o.total.toLocaleString()} ج</strong></td>
                <td><span className={`status ${statusClass[o.status]}`}>{o.status}</span></td>
                <td style={{color:"var(--muted)",fontSize:12}}>{o.date}</td>
                <td>
                  <select style={{padding:"5px 8px",borderRadius:6,border:"1px solid var(--border)",fontSize:12,fontFamily:"Cairo,sans-serif"}}
                    value={o.status} onChange={e=>changeStatus(o.id,e.target.value)}>
                    {orderStatuses.map(s=><option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCustomers({customers}) {
  const [search,setSearch]=useState("");
  const filtered = customers.filter(c=>c.name.includes(search)||c.email.includes(search)||c.phone.includes(search));
  return (
    <div>
      <div className="a-card">
        <div className="a-card-hdr"><h4>👥 العملاء ({customers.length})</h4></div>
        <div style={{padding:"16px 20px 0"}}>
          <div className="srch"><span>🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث بالاسم أو الإيميل أو الموبايل..."/></div>
        </div>
        <table className="tbl">
          <thead><tr><th>الاسم</th><th>البريد الإلكتروني</th><th>الموبايل</th><th>الطلبات</th><th>إجمالي الإنفاق</th><th>تاريخ الانضمام</th><th>الحالة</th></tr></thead>
          <tbody>
            {filtered.map(c=>(
              <tr key={c.id}>
                <td><strong style={{fontSize:13}}>{c.name}</strong></td>
                <td style={{fontSize:12,color:"var(--muted)"}}>{c.email}</td>
                <td style={{fontSize:12}}>{c.phone}</td>
                <td><strong style={{color:"var(--navy)"}}>{c.orders}</strong></td>
                <td><strong style={{color:"var(--gold)"}}>{c.total.toLocaleString()} ج</strong></td>
                <td style={{fontSize:12,color:"var(--muted)"}}>{c.joined}</td>
                <td><span className="status s-new">نشط</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [s,setS]=useState({name:"مملكة الجملة",email:"info@mamlakataljumla.com",phone:"01000000000",addr:"القاهرة، مصر",freeShip:500,tax:14,currency:"جنيه مصري"});
  const [saved,setSaved]=useState(false);
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };
  return (
    <div>
      <div className="a-card" style={{marginBottom:16}}>
        <div className="a-card-hdr"><h4>⚙️ إعدادات المتجر</h4></div>
        <div style={{padding:20}}>
          <div className="a-form">
            <div className="form-row">
              <div className="fld"><label>اسم المتجر</label><input value={s.name} onChange={e=>setS({...s,name:e.target.value})}/></div>
              <div className="fld"><label>البريد الإلكتروني</label><input value={s.email} onChange={e=>setS({...s,email:e.target.value})}/></div>
            </div>
            <div className="form-row">
              <div className="fld"><label>رقم الهاتف</label><input value={s.phone} onChange={e=>setS({...s,phone:e.target.value})}/></div>
              <div className="fld"><label>العنوان</label><input value={s.addr} onChange={e=>setS({...s,addr:e.target.value})}/></div>
            </div>
            <div className="form-row">
              <div className="fld"><label>حد الشحن المجاني (ج)</label><input type="number" value={s.freeShip} onChange={e=>setS({...s,freeShip:+e.target.value})}/></div>
              <div className="fld"><label>نسبة الضريبة (%)</label><input type="number" value={s.tax} onChange={e=>setS({...s,tax:+e.target.value})}/></div>
            </div>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <button className="btn-save" onClick={save}>💾 حفظ الإعدادات</button>
              {saved && <span style={{color:"var(--green)",fontWeight:700,fontSize:13}}>✅ تم الحفظ!</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="a-card">
        <div className="a-card-hdr"><h4>💳 بوابات الدفع</h4></div>
        <div style={{padding:20,display:"grid",gap:12}}>
          {[
            {name:"فيزا / ماستركارد",icon:"💳",status:true},
            {name:"فودافون كاش",icon:"📱",status:true},
            {name:"إنستا باي",icon:"🏦",status:false},
            {name:"كاش عند الاستلام",icon:"💵",status:true},
            {name:"فاليو (تقسيط)",icon:"📊",status:false},
          ].map(g=>(
            <div key={g.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"var(--cream)",borderRadius:9,border:"1px solid var(--border)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{g.icon}</span>
                <span style={{fontWeight:700,fontSize:14,color:"var(--navy)"}}>{g.name}</span>
              </div>
              <span className={`status ${g.status?"s-new":"s-cancel"}`}>{g.status?"مفعّل":"معطّل"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({onLogout, storeProducts, setStoreProducts, storeOrders, setStoreOrders}) {
  const [tab,setTab]=useState("overview");
  const [customers] = useState(initCustomers);
  const navItems = [
    {key:"overview",icon:"📊",label:"لوحة التحكم"},
    {key:"products",icon:"🛍️",label:"المنتجات"},
    {key:"orders",icon:"📦",label:"الطلبات"},
    {key:"customers",icon:"👥",label:"العملاء"},
    {key:"settings",icon:"⚙️",label:"الإعدادات"},
  ];
  const titles = {overview:"لوحة التحكم",products:"إدارة المنتجات",orders:"إدارة الطلبات",customers:"العملاء",settings:"الإعدادات"};
  const newOrds = storeOrders.filter(o=>o.status==="جديد").length;
  return (
    <div className="admin-wrap">
      <div className="a-side">
        <div className="a-side-logo">
          <h2>🏪 مملكة الجملة</h2>
          <small>ADMIN PANEL</small>
        </div>
        <div className="a-nav">
          {navItems.map(n=>(
            <button key={n.key} className={`a-nav-item ${tab===n.key?"on":""}`} onClick={()=>setTab(n.key)}>
              <span className="ni">{n.icon}</span>{n.label}
              {n.key==="orders" && newOrds>0 && <span style={{marginRight:"auto",background:"var(--red)",color:"white",borderRadius:20,padding:"1px 7px",fontSize:10,fontWeight:800}}>{newOrds}</span>}
            </button>
          ))}
        </div>
        <div className="a-exit"><button onClick={onLogout}>🚪 خروج من اللوحة</button></div>
      </div>
      <div className="a-main">
        <div className="a-topbar">
          <h3>{titles[tab]}</h3>
          <div className="a-topbar-info">
            <span>👤 Admin</span>
            <span style={{background:"var(--gold-bg)",color:"var(--navy)",padding:"4px 10px",borderRadius:20,fontWeight:700,fontSize:11}}>🟢 أونلاين</span>
          </div>
        </div>
        <div className="a-content">
          {tab==="overview" && <AdminOverview products={storeProducts} orders={storeOrders} customers={customers}/>}
          {tab==="products" && <AdminProducts products={storeProducts} setProducts={setStoreProducts}/>}
          {tab==="orders" && <AdminOrders orders={storeOrders} setOrders={setStoreOrders}/>}
          {tab==="customers" && <AdminCustomers customers={customers}/>}
          {tab==="settings" && <AdminSettings/>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [mode, setMode] = useState("store"); // "store" | "admin" | "login"
  const [adminLogged, setAdminLogged] = useState(false);

  // shared state between store & admin
  const [products, setProducts] = useState(initProducts);
  const [orders, setOrders] = useState(initOrders);

  // store state
  const [page, setPage] = useState("الرئيسية");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favs, setFavs] = useState([]);
  const [toast, setToast] = useState({show:false,msg:""});

  const showToast = (msg) => { setToast({show:true,msg}); setTimeout(()=>setToast({show:false,msg:""}),2500); };
  const addToCart = (p) => {
    setCart(prev=>{ const ex=prev.find(i=>i.id===p.id); return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}]; });
    showToast(`✅ تم إضافة "${p.name}" للكارت`);
    setCartOpen(true);
  };
  const changeQty = (id,d) => setCart(p=>p.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const removeFromCart = (id) => setCart(p=>p.filter(i=>i.id!==id));
  const toggleFav = (id) => setFavs(p=>p.includes(id)?p.filter(f=>f!==id):[...p,id]);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  const goAdmin = () => {
    if(adminLogged) setMode("admin");
    else setMode("login");
  };

  if(mode==="login") return (
    <>
      <style>{STYLES}</style>
      <AdminLogin onLogin={()=>{ setAdminLogged(true); setMode("admin"); }}/>
      <div style={{position:"fixed",bottom:16,right:16}}>
        <button className="btn-n" onClick={()=>setMode("store")}>← المتجر</button>
      </div>
    </>
  );

  if(mode==="admin") return (
    <>
      <style>{STYLES}</style>
      <AdminDashboard
        onLogout={()=>{ setAdminLogged(false); setMode("store"); }}
        storeProducts={products} setStoreProducts={setProducts}
        storeOrders={orders} setStoreOrders={setOrders}
      />
    </>
  );

  // STORE MODE
  const renderPage = () => {
    if(selected) return <ProductDetail p={selected} onAdd={addToCart} onBack={()=>setSelected(null)}/>;
    if(page==="الرئيسية") return <HomePage products={products} onAdd={addToCart} onView={setSelected} favs={favs} onFav={toggleFav} setPage={setPage}/>;
    if(page==="أزياء"||page==="مفروشات") return <CatPage cat={page} products={products} onAdd={addToCart} onView={setSelected} favs={favs} onFav={toggleFav}/>;
  };

  return (
    <>
      <style>{STYLES}</style>
      <Navbar page={selected?"تفاصيل المنتج":page} setPage={p=>{setPage(p);setSelected(null);}} cartCount={cartCount} onCart={()=>setCartOpen(true)}/>
      <main>{renderPage()}</main>
      <StoreFooter setPage={p=>{setPage(p);setSelected(null);}}/>
      <CartSidebar open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} onQty={changeQty} onRemove={removeFromCart}/>
      <div className={`toast ${toast.show?"on":""}`}>{toast.msg}</div>
      {/* Admin Access Button */}
      <button onClick={goAdmin}
        style={{position:"fixed",bottom:20,left:20,background:"var(--navy)",color:"var(--gold)",
          border:"2px solid var(--gold)",padding:"10px 18px",borderRadius:10,fontSize:12,fontWeight:800,
          cursor:"pointer",zIndex:50,boxShadow:"0 4px 16px rgba(0,0,0,.3)"}}>
        ⚙️ لوحة التحكم
      </button>
    </>
  );
}
