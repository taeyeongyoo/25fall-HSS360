export const initialSceneId = "act1_concubine_quarters";

// Scenes are organized by act. Replace the placeholder gradients with your painted backgrounds when ready.
export const storyGraph = {
  act1_concubine_quarters: {
    label: "제1막 · 보이지 않는 첩",
    background: "linear-gradient(130deg, #12070c, #2b0f1a, #3a1f2b)",
    speaker: "교씨의 독백",
    lines: [
      "내 이름은 교씨. 사람들은 나를 '그림자'라고 부른다.",
      "아홉 해가 되도록 아들을 낳지 못한 정실부인 사씨. 그녀의 관용 덕분에 나는 유한림 대감의 첩으로 들어왔다.",
      "하인들은 나를 '마님'이라 부르지 않는다. 그들에게 마님은 오직 사씨뿐이다. 남편인 유한림 대감조차 나를 찾을 때면 사씨 부인의 눈치를 살핀다.",
      "나는 '아들 낳는 도구'. 그것이 이 집에서 나에게 주어진 유일한 존재 이유다.",
    ],
    options: [
      {
        id: "toCourtyard",
        text: "새벽을 견디고 다음 날을 맞는다",
        next: "act1_courtyard",
      },
    ],
  },
  act1_courtyard: {
    label: "제1막 · 사씨와의 조우",
    //background: "linear-gradient(120deg, #0d1b1a, #1f3c34, #345748)",
    background: "url('assets/backgrounds/act1_courtyard.webp')",
    speaker: "교씨",
    lines: [
      "정실부인 사씨는 모든 하인에게 존경받는다. 그녀는 나를 발견하자, 늘 그렇듯 인자한 미소를 지어 보인다.",
      '사씨: "아, 교씨로군. 밤새 편안했는가. 요즘 대감께서 자네 처소에 자주 들르시더군. 부디 가문의 경사를 위해 힘써주게."',
      "'가문의 경사'란 곧 '아들'을 의미한다. 그녀의 미소에는 조금의 흔들림도 없다. 저 여유는 어디에서 나오는 것일까.",
    ],
    options: [
      {
        id: "courtyardChoice",
        text: "사씨의 말을 곱씹으며 처소로 돌아간다",
        next: "act1_mirror",
      },
    ],
  },
  act1_mirror: {
    label: "제1막 · 거울 앞에서",
    //background: "linear-gradient(120deg, #1a1427, #2b2142, #3d3563)",
    background: "url('assets/backgrounds/act1_mirror.webp')",
    speaker: "교씨",
    lines: [
      "사씨는 내 손을 가만히 잡아준다. 따뜻하지만 어딘가 서늘한 온기였다.",
      '사씨: "첩의 자리라는 것이 고될 걸세. 허나 자네가 도리를 다하고 분수를 지킨다면, 내 자네를 박대하는 일은 결코 없을 것이야."',
      "'분수를 지킨다면'—그 말이 귓가에 맴돈다. 이대로 분수를 지키며 산다면 나는 평생 사씨의 그림자로 살 것이다.",
      "운 좋게 아들을 낳아도 그 아이는 '첩의 자식'이라는 굴레를 벗지 못한다.",
      "하지만 사씨에게 맞선다면? 이 거대한 저택에서 나 혼자 무엇을 할 수 있단 말인가.",
      "[주요 분기점] 당신의 생존 방식을 선택하십시오.",
    ],
    options: [
      {
        id: "stabilityRoute",
        text: "사씨 부인의 뜻을 거스르지 않는다 — [안정 루트]",
        next: "route_stability_intro",
      },
      {
        id: "charmerRoute",
        text: "유한림 대감의 마음을 얻는다 — [제3 루트]",
        next: "route_charmer_intro",
      },
      {
        id: "ambitionRoute",
        text: "반드시 아들을 낳아 이 집의 주인이 된다 — [야망 루트]",
        next: "route_ambition_intro",
      },
    ],
  },
  route_stability_intro: {
    label: "안정 루트 개방",
    background: "linear-gradient(125deg, #1a1f23, #2d373d, #435059)",
    speaker: "교씨",
    lines: [
      "나는 사씨 부인의 관용을 방패 삼기로 했다. 그녀의 신뢰를 잃지 않는 것이 곧 나와 뱃속의 아이를 지키는 길.",
      "그녀의 곁에서 그림자처럼 움직이며 다섯 막의 서사가 펼쳐질 때까지 숨을 고른다.",
    ],
    options: [
      {
        id: "act2HintStable",
        text: "제2막으로 나아간다",
        next: "act2_birth_chamber",
      },
      {
        id: "restartStable",
        text: "다시 선택 지점으로 돌아간다",
        next: "act1_mirror",
        variant: "secondary",
      },
    ],
  },
  route_charmer_intro: {
    label: "제3 루트 개방",
    background: "linear-gradient(120deg, #241428, #411b3b, #5d2450)",
    speaker: "교씨",
    lines: [
      "사씨가 가진 모든 것은 남편에게서 나온다. 나는 유한림 대감의 마음을 사로잡아, 그가 기댈 곳을 나로 바꾸겠다.",
      "매혹의 미소 뒤에서 다섯 막에 걸친 판도가 조금씩 뒤틀리도록 실을 잡는다.",
    ],
    options: [
      {
        id: "act2HintCharmer",
        text: "제2막으로 나아간다",
        next: "act2_birth_chamber",
      },
      {
        id: "restartCharmer",
        text: "다시 선택 지점으로 돌아간다",
        next: "act1_mirror",
        variant: "secondary",
      },
    ],
  },
  route_ambition_intro: {
    label: "야망 루트 개방",
    background: "linear-gradient(120deg, #2b0c10, #531b1e, #7a2a28)",
    speaker: "교씨",
    lines: [
      "이 가문의 유일한 약점은 후사다. 내가 아들을 낳아야 한다. 사씨를 넘어, 이 집의 주인이 되는 길밖에 없다.",
      "피와 눈물로 다섯 막을 헤치며 끝내 이 가문을 움켜쥐겠다.",
    ],
    options: [
      {
        id: "act2HintAmbition",
        text: "제2막으로 나아간다",
        next: "act2_birth_chamber",
      },
      {
        id: "restartAmbition",
        text: "다시 선택 지점으로 돌아간다",
        next: "act1_mirror",
        variant: "secondary",
      },
    ],
  },
  act2_birth_chamber: {
    label: "제2막 · 기회의 잉태",
    //background: "linear-gradient(120deg, #402824, #704232, #9a6143)",
    background: "url('assets/backgrounds/act2_birth_chamber.webp')",
    speaker: "교씨",
    lines: [
      "내 아들 '장주'가 태어났다. 내가 아들을 낳자, 가문의 공기가 바뀌었다.",
      "그림자라 불리던 나는 이제 '장주의 어미'가 되었다. 남편 유한림은 노골적으로 기뻐하며 내 처소에 머무는 날이 길어졌다.",
      "하인들은 비록 앞에 작은이라 붙일지언정, 나를 마님이라 부르기 시작했다.",
      "이 모든 변화는 내 품에 안긴 이 작은 아이가 가져온 것이다.",
      '유한림: "하하, 교씨! 그대가 우리 가문을 살렸소! 이 아이를 보시오. 나를 꼭 닮지 않았소?"',
      "나는 그에게 아양을 떨며 내 입지를 다진다.",
      '교씨: "대감... 이 아이가 대감께 복을 가져다줄 것입니다. 부디 이 아이와 저를 잊지 말아 주십시오."',
      '그때, 하인이 문을 열고 조심스럽게 고한다. "작은 마님... 큰 마님께서 아기씨를 보러 오셨습니다."',
    ],
    options: [
      {
        id: "toSassiVisit",
        text: "사씨 부인을 맞이한다",
        next: "act2_sassi_visit",
      },
    ],
  },
  act2_sassi_visit: {
    label: "제2막 · 사씨의 방문",
    //background: "linear-gradient(120deg, #2a1d31, #4a2f4e, #674163)",
    background: "url('assets/backgrounds/act2_sassi_visit.webp')",
    speaker: "교씨",
    lines: [
      "방 안의 소란이 얼어붙는다. 사씨 부인이 흐트러짐 없는 모습으로 들어와 내 품의 아기만 응시한다.",
      '사씨: "교씨. 참으로 복덩이를 낳았네. 이 아이는 가문의 귀한 적장자일세."',
      "적장자라는 말에 심장이 내려앉는다. 첩의 자식은 적장자가 될 수 없다.",
      '사씨: "자네도 알다시피 나는 덕이 부족해 아이를 갖지 못했지. 괜찮다면 이 아이를 내 아들로 삼아 정실부인의 자식으로 키우고 싶네. 자네 생각은 어떤가?"',
      "정중하지만 거절할 수 없는 압력. 유한림은 시선을 피한다.",
      "아들을 정실의 아들로 올리는 제안—기회인가, 아니면 모든 것을 빼앗기겠다는 경고인가.",
    ],
    options: [
      {
        id: "toAct2Decision",
        text: "사씨의 제안을 곱씹는다",
        next: "act2_decision",
      },
    ],
  },
  act2_decision: {
    label: "제2막 · 선택의 순간",
    background: "linear-gradient(120deg, #1d1a2a, #2e2743, #43375f)",
    speaker: "교씨",
    lines: [
      "아이가 칭얼거리는 소리만이 방 안을 채운다. 사씨와 유한림의 시선이 내게 꽂힌다.",
      "[주요 분기점] 당신의 아들의 운명을 결정하십시오.",
    ],
    options: [
      {
        id: "act2_stability",
        text: "부인의 뜻을 따른다 — [안정 루트 강화]",
        next: "act2_result_stability",
      },
      {
        id: "act2_charmer",
        text: "유한림의 동정을 끌어 결정을 미룬다 — [제3 루트 강화]",
        next: "act2_result_charmer",
      },
      {
        id: "act2_ambition",
        text: "아들을 내주지 않는다 — [야망 루트 강화]",
        next: "act2_result_ambition",
      },
    ],
  },
  act2_result_stability: {
    label: "안정 루트 · 장주를 내어주다",
    //background: "linear-gradient(120deg, #1a231f, #2e3c35, #445a4a)",
    background: "url('assets/backgrounds/act2_result_stability.webp')",
    speaker: "교씨",
    lines: [
      '나는 조용히 고개를 숙였다. "부인의 뜻이 그러하시다면, 기꺼이 따르겠습니다."',
      "장주는 정실의 자식이 되었고, 나는 생모로서의 대우를 보장받았다. 사씨의 경계는 누그러진다.",
      "그러나 야망을 펼칠 길은 스스로 닫혔다. 대신 더욱 견고한 안전을 얻었다.",
    ],
    options: [
      {
        id: "toAct3Stability",
        text: "제3막으로 이동",
        next: "act3_intro_stability",
      },
      {
        id: "revisitAct2",
        text: "선택을 다시 생각한다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act2_result_charmer: {
    label: "제3 루트 · 동정의 지렛대",
    //background: "linear-gradient(120deg, #2a1b2f, #4c2c4e, #6a3c68)",
    background: "url('assets/backgrounds/act2_result_charmer.webp')",
    speaker: "교씨",
    lines: [
      '나는 눈가를 적시며 유한림을 바라보았다. "대감... 아직 제 품을 떠나기엔 너무 어린 아이입니다."',
      "아들을 내주지도 거절하지도 않은 채 결정을 미룬다. 유한림의 애정은 높아지고, 사씨의 의심 또한 자란다.",
      "양쪽의 감정을 저울질하며 제3의 길을 도모한다.",
    ],
    options: [
      {
        id: "toAct3Charmer",
        text: "제3막으로 이동",
        next: "act3_intro_charmer",
      },
      {
        id: "revisitAct2Charmer",
        text: "선택을 다시 생각한다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act2_result_ambition: {
    label: "야망 루트 · 장주를 지키다",
    background: "linear-gradient(120deg, #3a1816, #6a261f, #943526)",
    speaker: "교씨",
    lines: [
      '"부인의 은혜는 감사하오나, 어미로서 제 자식을 포기할 순 없습니다." 나는 단호하게 말했다.',
      "사씨와의 갈등이 공식적으로 시작된다. 그러나 아들이라는 유일한 무기를 놓지 않는다.",
      "권력을 향한 첫걸음이 이제 막 내딛어졌다.",
    ],
    options: [
      {
        id: "toAct3Ambition",
        text: "제3막으로 이동",
        next: "act3_intro_ambition",
      },
      {
        id: "revisitAct2Ambition",
        text: "선택을 다시 생각한다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act3_intro_ambition: {
    label: "제3막 · 위험한 속삭임 (야망)",
    background: "linear-gradient(120deg, #2f0e1a, #581b22, #812c2a)",
    speaker: "교씨",
    lines: [
      "장주를 포기하지 않겠다는 선언 이후, 사씨 부인은 더 이상 미소 짓지 않는다.",
      "저택의 하인들은 나를 없는 사람 취급했고, 땔감도 탕약도 제때 오지 않았다.",
      "유한림은 두 여자의 싸움에 지쳐 서재에 틀어박혔다. 아들을 낳고도 나는 고립되었다.",
      "성인군자의 가면을 벗겨낼 결정적인 한 방이 필요하다.",
    ],
    options: [
      {
        id: "toDongcheongFromAmbition",
        text: "어둠 속 손님을 맞는다",
        next: "act3_dongcheong",
      },
      {
        id: "returnAct2Ambition",
        text: "제2막 선택으로 돌아간다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act3_intro_stability: {
    label: "제3막 · 위험한 속삭임 (안정)",
    background: "linear-gradient(120deg, #1b2331, #2f3a4b, #42576b)",
    speaker: "교씨",
    lines: [
      "장주는 사씨의 아들이 되었고, 나는 생모로서의 대우를 받으며도 내 아이를 안아볼 수 없다.",
      "장주는 사씨를 어머니라 부르고, 나를 교 부인이라 부른다. 이것이 안정의 대가다.",
      "사씨는 고마워하면서도 여전히 경계했다. 나는 권력도 아들도 없이 화려한 감옥에 갇혔다.",
      "정말 이대로 괜찮은 걸까.",
    ],
    options: [
      {
        id: "toDongcheongFromStability",
        text: "어둠 속 손님을 맞는다",
        next: "act3_dongcheong",
      },
      {
        id: "returnAct2Stability",
        text: "제2막 선택으로 돌아간다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act3_intro_charmer: {
    label: "제3막 · 위험한 속삭임 (제3 루트)",
    background: "linear-gradient(120deg, #261d35, #402f52, #5a4370)",
    speaker: "교씨",
    lines: [
      "눈물은 효과가 있었다. 유한림은 젖을 뗄 때까지만이라며 사씨의 제안을 미뤘다.",
      "그는 밤마다 내 처소에 들며 비단과 장신구를 안겼고, 나는 한없이 연약한 여자가 되었다.",
      "하지만 사씨의 눈빛은 날카로워졌다. 내가 남편을 홀리고 있다고 믿는다.",
      "이 균형은 오래가지 않는다. 내가 먼저 움직여야 한다.",
    ],
    options: [
      {
        id: "toDongcheongFromCharmer",
        text: "어둠 속 손님을 맞는다",
        next: "act3_dongcheong",
      },
      {
        id: "returnAct2Charmer",
        text: "제2막 선택으로 돌아간다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act3_dongcheong: {
    label: "제3막 · 동청의 속삭임",
    //background: "linear-gradient(120deg, #130f1f, #231b33, #362847)",
    background: "url('assets/backgrounds/act3_dongcheong.webp')",
    speaker: "교씨",
    lines: [
      "늦은 밤, 문객 동청이 몰래 들이닥쳤다. 모든 비밀을 아는 자.",
      "나는 그를 꾸짖었지만, 그는 비웃으며 속삭였다.",
      '동청: "성인군자 사씨 부인의 그늘에 가려 평생 그림자로 살 셈입니까?"',
      '그는 사씨를 제거할 잔혹한 계략을 제시한다. "마님께서 낳으신 아들을 이용하는 것입니다."',
      "친아들을 희생해 사씨에게 죄를 뒤집어씌우자는 제안.",
      "그의 손을 잡을 것인가, 뿌리칠 것인가.",
    ],
    options: [
      {
        id: "toAct3Decision",
        text: "동청의 제안에 답한다",
        next: "act3_decision",
      },
      /*
      {
        id: "backToAct3Intro",
        text: "잠시 마음을 가다듬는다",
        next: "act3_reflect",
        variant: "secondary",
      },
      */
    ],
  },
  act3_reflect: {
    label: "제3막 · 마음을 추스르다",
    background: "linear-gradient(120deg, #161927, #25273a, #343752)",
    speaker: "교씨",
    lines: [
      "동청의 속삭임이 머릿속을 맴돈다. 나는 다시 나의 입장을 정리해야 한다.",
    ],
    options: [
      {
        id: "reflectStability",
        text: "안정의 마음을 되새긴다",
        next: "act3_intro_stability",
      },
      {
        id: "reflectCharmer",
        text: "유혹의 균형을 돌아본다",
        next: "act3_intro_charmer",
      },
      {
        id: "reflectAmbition",
        text: "야망을 불태운다",
        next: "act3_intro_ambition",
      },
      {
        id: "reflectAct2",
        text: "제2막 선택으로 돌아간다",
        next: "act2_decision",
        variant: "secondary",
      },
    ],
  },
  act3_decision: {
    label: "제3막 · 주요 분기점",
    background: "linear-gradient(120deg, #1b1327, #291b3a, #3a2952)",
    speaker: "교씨",
    lines: ["[주요 분기점] 당신의 적을 누구로 정하시겠습니까?"],
    options: [
      {
        id: "act3ChoiceAmbition",
        text: "동청의 손을 잡는다 — [야망 루트 확정]",
        next: "act3_result_ambition",
      },
      {
        id: "act3ChoiceStability",
        text: "동청을 몰아낸다 — [안정 루트 확정]",
        next: "act3_result_stability",
      },
      {
        id: "act3ChoiceCharmer",
        text: "동청을 이용한다 — [제3 루트 확정]",
        next: "act3_result_charmer",
      },
    ],
  },
  act3_result_ambition: {
    label: "야망 루트 확정",
    //background: "linear-gradient(120deg, #310c16, #5c1620, #861f29)",
    background: "url('assets/backgrounds/act3_result_ambition.webp')",
    speaker: "교씨",
    lines: [
      '"...자세히 말해보게. 내 아들을 어떻게 희생시키겠다는 것인가."',
      "나는 친아이마저 도구로 삼기로 했다. 사씨를 제거하기 위해서라면 악인이 되겠다.",
      "동청은 만족스런 미소를 지으며 더 깊은 음모를 속삭인다.",
    ],
    options: [
      { id: "toAct4Ambition", text: "제4막으로 이동", next: "act4_ambition" },
      {
        id: "revisitAct3",
        text: "다른 선택을 탐색한다",
        next: "act3_decision",
        variant: "secondary",
      },
    ],
  },
  act3_result_stability: {
    label: "안정 루트 확정",
    //background: "linear-gradient(120deg, #13241f, #1f3a32, #2d5145)",
    background: "url('assets/backgrounds/act3_result_stability.webp')",
    speaker: "교씨",
    lines: [
      '"더러운 입 닥치지 못할까! 내 아들을 걸고넘어지다니! 당장 꺼져라!"',
      "나는 동청을 내쫓으며, 사씨와의 공존 혹은 굴복을 다시 받아들인다.",
      "그는 나를 적으로 여길 것이다. 그러나 아들은 지켰다.",
    ],
    options: [
      { id: "toAct4Stability", text: "제4막으로 이동", next: "act4_stability" },
      {
        id: "revisitAct3Stability",
        text: "다른 선택을 탐색한다",
        next: "act3_decision",
        variant: "secondary",
      },
    ],
  },
  act3_result_charmer: {
    label: "제3 루트 확정",
    background: "linear-gradient(120deg, #251a34, #3f2852, #58346f)",
    speaker: "교씨",
    lines: [
      '"어리석긴. 내 아들을 해치고 얻을 수 있는 건 없어. 적은 사씨가 아니야."',
      "나는 동청을 장기말로 삼기로 했다. 그의 야망을 유한림을 흔드는 도구로 바꾼다.",
      "이제 사씨도, 동청도, 유한림도 내 무대 위 배우들이다.",
    ],
    options: [
      { id: "toAct4Charmer", text: "제4막으로 이동", next: "act4_charmer" },
      {
        id: "revisitAct3Charmer",
        text: "다른 선택을 탐색한다",
        next: "act3_decision",
        variant: "secondary",
      },
    ],
  },
  act4_ambition: {
    label: "제4막 · 피로 물든 재산",
    background: "linear-gradient(120deg, #2b090c, #501314, #7a1d18)",
    speaker: "교씨",
    lines: [
      "동청과 손을 잡은 뒤, 나는 은밀히 사씨의 재산줄을 끊고 대감의 장부를 조작했다.",
      "이제 마지막으로 남은 것은 유배지에 있는 대감의 재산까지 내 손으로 옮겨오는 일이다.",
      "한 번의 결정으로 모든 것을 내 것으로 만들 수 있다.",
    ],
    options: [
      {
        id: "act4AmbitionChoice",
        text: "재산을 확보한다",
        next: "act5_ending_a",
      },
      {
        id: "act4AmbitionBack",
        text: "제3막 분기점으로 돌아간다",
        next: "act3_decision",
        variant: "secondary",
      },
    ],
  },
  act4_stability: {
    label: "제4막 · 숨죽인 기다림",
    background: "linear-gradient(120deg, #132823, #1f3d34, #2c5245)",
    speaker: "교씨",
    lines: [
      "나는 동청을 내쫓은 뒤, 문을 걸어 잠그고 오직 장주를 지키는 일에만 몰두했다.",
      "사치도 권력도 바라지 않는다. 다만 아들이 무사히 성장해 유한림이 돌아올 날을 기다린다.",
    ],
    options: [
      {
        id: "act4StabilityChoice",
        text: "아들을 지키며 때를 기다린다",
        next: "act5_ending_b",
      },
      {
        id: "act4StabilityBack",
        text: "제3막 분기점으로 돌아간다",
        next: "act3_decision",
        variant: "secondary",
      },
    ],
  },
  act4_charmer: {
    label: "제4막 · 구명 계략",
    background: "linear-gradient(120deg, #2a1d3b, #442c5a, #5d3a79)",
    speaker: "교씨",
    lines: [
      "나는 동청을 장기말로 삼아 조정에 상소를 올리고, 뇌물을 써서 유배지의 바람을 움직였다.",
      "'남편을 구하기 위해 애쓰는 아내'라는 역할을 완벽히 연기해야 한다.",
    ],
    options: [
      {
        id: "act4CharmerChoice",
        text: "유한림을 구명할 방도를 찾는다",
        next: "act5_ending_c",
      },
      {
        id: "act4CharmerBack",
        text: "제3막 분기점으로 돌아간다",
        next: "act3_decision",
        variant: "secondary",
      },
    ],
  },
  act5_ending_a: {
    label: "제5막 · 권선징악",
    //background: "linear-gradient(120deg, #280509, #4a0e13, #72171d)",
    background: "url('assets/backgrounds/act5_ending_a.webp')",
    speaker: "교씨",
    lines: [
      "몇 년이 지나 나는 동청과 함께 유한림의 재산을 빼돌려 저택의 주인이 되었다.",
      "그러나 유배에서 풀려난 유한림과 사씨 부인이 돌아온 순간 모든 것이 무너졌다.",
      '유한림: "유배지에서 모든 것을 알았다! 네년이 동청과 짜고 사씨를 모함하고, 장주까지 해치려 했으며 재산을 빼돌린 것을!"',
      "나는 억울함을 외쳤지만 하인들에게 끌려갔고, 사씨는 장주를 품에 안은 채 나를 내려다보았다.",
      "역사는 나를 “천성이 간악한 악녀”로 기록했다.",
    ],
    options: [
      {
        id: "endingAGoMain",
        text: "Go to Main Screen",
        action: "returnToMain",
      },
    ],
  },
  act5_ending_b: {
    label: "제5막 · 공존",
    //background: "linear-gradient(120deg, #122422, #1c3634, #254745)",
    background: "url('assets/backgrounds/act5_ending_b.webp')",
    speaker: "교씨",
    lines: [
      "유한림 없는 세월 동안 나는 문을 걸어 잠그고 장주만 지켰다.",
      "유배에서 돌아온 유한림과 사씨 앞에서 나는 더 이상 적이 아니었다.",
      '사씨: "교 부인 또한 장주의 생모입니다. 별채를 내어주시고 합당한 예우를 갖춰주십시오."',
      "권력을 얻진 못했지만, 아들과 안정은 지켜냈다.",
    ],
    options: [
      {
        id: "endingBGoMain",
        text: "Go to Main Screen",
        action: "returnToMain",
      },
    ],
  },
  act5_ending_c: {
    label: "제5막 · 교씨의 변론",
    //background: "linear-gradient(120deg, #2f1f41, #4d3265, #6b4487)",
    background: "url('assets/backgrounds/act5_ending_c.webp')",
    speaker: "교씨",
    lines: [
      "유배 기간 동안 나는 모든 매혹과 지략을 동원해 유한림을 구명했다.",
      '그는 돌아오자마자 내 손을 잡고 눈물을 흘리며 "그대만이 나를 버리지 않았구려!"라 외쳤다.',
      "사씨가 안주인 자리를 되찾으려 하자 유한림은 내가 진정한 안주인이라 선언했다.",
      "사씨의 그늘 속 그림자가 아니라, 역사를 쓰는 승자가 된 순간이었다.",
    ],
    options: [
      {
        id: "endingCGoMain",
        text: "Go to Main Screen",
        action: "returnToMain",
      },
    ],
  },
};
