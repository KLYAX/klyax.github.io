import { IS_COMPETITION_VERSION } from "config/index";

import grandMater from "./grand-master";
import zipSibNeftekhim from "./zap-sib-neftekhim";
import paoNlmk from "./pao-nlmk";
import nevinnomysskyAzot from "./nevinnomyssky-azot";
import oaoSnpz from "./oao-snpz";
import golderHorn from "./golder-horn";
import taifNk from "./taif-nk";
import agrocomplex from "./agrocomplex";
import aoTransneftSiberia from "./ao-transneft-siberia";
import frutoNanny from "./fruto-nanny";
import oaoGiap from "./oao-giap";

import metroCC from "./metro-c-c";
import cjscYoshkarOlaMeatProcessingPlant from "./cjsc-yoshkar-ola-meat-processing-plant";
import gcYugstroyinvest from "./gc-yugstroyinvest";
import llcNeftebitumKngk from "./llc-neftebitum-kngk";

let facilities = [gcYugstroyinvest, llcNeftebitumKngk, cjscYoshkarOlaMeatProcessingPlant, metroCC];

if (IS_COMPETITION_VERSION) {
  facilities = [
    ...facilities,
    grandMater,
    zipSibNeftekhim,
    paoNlmk,
    nevinnomysskyAzot,
    oaoSnpz,
    golderHorn,
    taifNk,
    agrocomplex,
    aoTransneftSiberia,
    frutoNanny,
    oaoGiap,
  ];
}

export default facilities;
