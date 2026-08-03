// ============================================================
// بيانات الأذكار
// ============================================================
const azkarData = {
  afterPrayer: {
    title: "أذكار بعد الصلاة",
    icon: "🕌",
    desc: "تُقال عقب كل صلاة مكتوبة ",
    items: [
      { text: "أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ", count: 3 },
      { text: "اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", count: 1 },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ", count: 1 },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ، لَا إِلَهَ إِلَّا اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ", count: 1 },
      { text: "سُبْحَانَ اللَّهِ", count: 33, fadl: "ثم يُكمل المئة بقوله: لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير" },
      { text: "الْحَمْدُ لِلَّهِ", count: 33 },
      { text: "اللَّهُ أَكْبَرُ", count: 33 },
      { text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1, fadl: "آية الكرسي — من قالها دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت" },
      { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾", count: 1, fadl: "سورة الإخلاص كاملة" },
      { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾", count: 1, fadl: "سورة الفلق كاملة" },
      { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾", count: 1, fadl: "سورة الناس كاملة — تُقرأ المعوذتان والإخلاص بعد كل صلاة، وثلاث مرات بعد الفجر والمغرب" },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 10, fadl: "عشر مرات بعد صلاتي المغرب والصبح" },
      { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", count: 1, fadl: "بعد السلام من صلاة الفجر" }
    ]
  },
  morning: {
    title: "أذكار الصباح",
    icon: "☀️",
    desc: "من بعد صلاة الفجر إلى شروق الشمس ",
    items: [
      { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ", count: 1 },
      { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ", count: 1 },
      { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", count: 1, fadl: "سيد الاستغفار — من قالها موقنًا بها حين يصبح فمات من يومه دخل الجنة، وكذلك حين يمسي" },
      { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4, fadl: "من قالها أعتقه الله من النار" },
      { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1 },
      { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", count: 3 },
      { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7 },
      { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي", count: 1 },
      { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ", count: 1 },
      { text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, fadl: "لم يضره شيء حتى يمسي" },
      { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 3, fadl: "كان حقًا على الله أن يُرضيه يوم القيامة" },
      { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ", count: 1 },
      { text: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ", count: 1 },
      { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100, fadl: "حُطّت خطاياه وإن كانت مثل زبد البحر" },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 10, fadl: "أو مرة واحدة عند الكسل، وقد تُقال مائة مرة" },
      { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
      { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", count: 10 }
    ]
  },
  evening: {
    title: "أذكار المساء",
    icon: "🌙",
    desc: "من بعد صلاة العصر إلى غروب الشمس ",
    items: [
      { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا", count: 1 },
      { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ", count: 1 },
      { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ", count: 1, fadl: "سيد الاستغفار — من قالها موقنًا بها حين يمسي فمات قبل أن يصبح دخل الجنة" },
      { text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4 },
      { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1 },
      { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", count: 3 },
      { text: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7 },
      { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي، وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي", count: 1 },
      { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ", count: 1 },
      { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 },
      { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3, fadl: "لم يضره شيء حتى يصبح" },
      { text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا", count: 3 },
      { text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ", count: 1 },
      { text: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ", count: 1 },
      { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100 },
      { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ", count: 3 },
      { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", count: 10 }
    ]
  },
  sleep: {
    title: "أذكار النوم",
    icon: "🌟",
    desc: "تُقال عند  النوم ",
    items: [
      { text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", count: 1 },
      { text: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ", count: 1 },
      { text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", count: 1, fadl: "آية الكرسي — من قرأها عند النوم لم يزل عليه من الله حافظ ولا يقربه شيطان حتى يصبح" },
      { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾", count: 3, fadl: "سورة الإخلاص — تُقرأ مع المعوذتين ثلاث مرات، ثم يُنفث في الكفين ويُمسح بهما الجسد" },
      { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾", count: 3, fadl: "سورة الفلق" },
      { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾", count: 3, fadl: "سورة الناس" },
      { text: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ ۚ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", count: 1, fadl: "آخر آيتين من سورة البقرة — من قرأهما في ليلة كفتاه" },
      { text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ", count: 1 },
      { text: "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", count: 1 },
      { text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", count: 1 },
      { text: "سُبْحَانَ اللَّهِ", count: 33 },
      { text: "الْحَمْدُ لِلَّهِ", count: 33 },
      { text: "اللَّهُ أَكْبَرُ", count: 34, fadl: "خير لكما من خادم تسألانه" },
      { text: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ، وَرَبَّ الْأَرْضِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِكْرَامِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ، اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ، وَأَغْنِنَا مِنَ الْفَقْرِ", count: 1 },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ", count: 1 },
      { text: "اقرأ سورة السجدة (الم * تنزيل) وسورة الملك (تبارك الذي بيده الملك) كاملتين", count: 1, fadl: "كان النبي ﷺ لا ينام حتى يقرأ هاتين السورتين" }
    ]
  },
  misc: {
    title: "أذكار متنوعة",
    icon: "🌧️",
    desc: "أدعية لمواقف ومناسبات الحياة اليومية ",
    items: [
      { text: "عند الخروج: بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ. وعند الدخول: بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا", count: 1, fadl: "دعاء دخول المنزل والخروج منه — ثم ليُسلِّم على أهله عند الدخول" },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 1, fadl: "دعاء دخول السوق — من قالها كُتب له ألف ألف حسنة، ومُحيت عنه ألف ألف سيئة، ورُفع له ألف ألف درجة" },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ", count: 1, fadl: "دعاء الكرب" },
      { text: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ؛ فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي، ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِنِي بِهِ", count: 1, fadl: "دعاء الاستخارة — يُصلّي ركعتين من غير الفريضة، ويُسمّي حاجته في موضع «هذا الأمر»" },
      { text: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", count: 1, fadl: "دعاء قضاء الدين" },
      { text: "بِسْمِ اللَّهِ (ثلاث مرات)، ثم: أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ", count: 7, fadl: "دعاء المرض — يضع يده على موضع الألم من جسده ويقولها" },
      { text: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ", count: 7, fadl: "دعاء زيارة المريض — من عاد مريضًا لم يحضر أجله فقالها سبع مرات عافاه الله من ذلك المرض. ويقال للمريض أيضًا: لا بأس طهور إن شاء الله" },
      { text: "اللَّهُمَّ صَيِّبًا نَافِعًا", count: 1, fadl: "دعاء نزول المطر" },
      { text: "عند هبوب الريح: اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا أُرْسِلَتْ بِهِ. وعند سماع الرعد: سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ", count: 1, fadl: "دعاء الريح والرعد" },
      { text: "اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيقِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى، رَبُّنَا وَرَبُّكَ اللَّهُ", count: 1, fadl: "دعاء رؤية الهلال" },
      { text: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ", count: 1, fadl: "دعاء لُبس الثوب الجديد" },
      { text: "إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلِ: الْحَمْدُ لِلَّهِ، وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ: يَرْحَمُكَ اللَّهُ، فَإِذَا قَالَ لَهُ: يَرْحَمُكَ اللَّهُ، فَلْيَقُلْ: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ", count: 1, fadl: "دعاء العطاس" },
      { text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ", count: 3, fadl: "دعاء التوبة والاستغفار — من قالها غفر الله له وإن كان فرّ من الزحف" },
      { text: "رَبِّ اغْفِرْ لِي، وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ", count: 100, fadl: "ما يُقال في المجلس — كان يُعدّ لرسول الله ﷺ في المجلس الواحد مائة مرة قبل أن يقوم" },
      { text: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أنتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ", count: 1, fadl: "كفارة المجلس (دعاء ختم المجلس) — من قالها في مجلس ذِكر كان كالطابع يُطبع عليه، ومن قالها في مجلس لغط كانت كفارة له" }
    ]
  },
  daily: {
    title: "أذكار الحياة اليومية",
    icon: "🏠",
    desc: "أذكار إضافية من حصن المسلم لم تكن مضافة بعد",
    items: [
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", count: 1, fadl: "أذكار الاستيقاظ من النوم" },
      { text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي", count: 1, fadl: "من قالها عند الاستيقاظ ليلًا ثم دعا استُجيب له، فإن توضأ وصلى قُبلت صلاته" },
      { text: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ", count: 1, fadl: "دعاء دخول الخلاء (الحمّام)" },
      { text: "غُفْرَانَكَ", count: 1, fadl: "دعاء الخروج من الخلاء (الحمّام)" },
      { text: "بِسْمِ اللَّهِ", count: 1, fadl: "الذكر قبل الوضوء" },
      { text: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ. سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ", count: 1, fadl: "الذكر بعد الفراغ من الوضوء" },
      { text: "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ وَالصَّلَاةُ وَالصَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", count: 1, fadl: "دعاء دخول المسجد — يبدأ برجله اليمنى" },
      { text: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالصَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ", count: 1, fadl: "دعاء الخروج من المسجد — يبدأ برجله اليسرى" },
      { text: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ", count: 1, fadl: "دعاء الهمّ والحزن" },
      { text: "بِسْمِ اللَّهِ، فَإِنْ نَسِيَ فِي أَوَّلِهِ فَلْيَقُلْ: بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ", count: 1, fadl: "الدعاء قبل الطعام" },
      { text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", count: 1, fadl: "الدعاء عند الفراغ من الطعام" },
      { text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", count: 1, fadl: "دعاء الغضب" },
      { text: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ. اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ", count: 1, fadl: "دعاء السفر — وإذا رجع زاد: آيبون تائبون عابدون لربنا حامدون" }
    ]
  }
};

// ============================================================
// حالة التطبيق
// ============================================================
let currentCat = "afterPrayer";
const STORAGE_KEY = "azkar_progress_v1";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
}
function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}
let progress = loadProgress();

function getItemProgress(cat, idx) { return (progress[cat] && progress[cat][idx]) || 0; }
function setItemProgress(cat, idx, val) {
  if (!progress[cat]) progress[cat] = {};
  progress[cat][idx] = val;
  saveProgress(progress);
}

let fontScale = parseFloat(localStorage.getItem("azkar_font_scale")) || 1.18;

// ============================================================
// الثيم (Dark / Light Theme)
// ============================================================
const themeToggleBtn = document.getElementById("themeToggleBtn");
function initTheme() {
  const savedTheme = localStorage.getItem("site_theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleBtn) themeToggleBtn.querySelector('.btn-content').textContent = "☀️";
  }
}
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("site_theme", isLight ? "light" : "dark");
    themeToggleBtn.querySelector('.btn-content').textContent = isLight ? "☀️" : "🌙";
  });
}
initTheme();

// ============================================================
// الشاشة المنبثقة للمطور
// ============================================================
const developerBtn = document.getElementById("developerBtn");
const devModalOverlay = document.getElementById("devModalOverlay");
const closeDevModal = document.getElementById("closeDevModal");

if (developerBtn && devModalOverlay) {
  developerBtn.addEventListener("click", () => {
    devModalOverlay.classList.add("open");
  });

  closeDevModal.addEventListener("click", () => {
    devModalOverlay.classList.remove("open");
  });

  devModalOverlay.addEventListener("click", (e) => {
    if (e.target === devModalOverlay) {
      devModalOverlay.classList.remove("open");
    }
  });
}

// ============================================================
// عرض الأذكار والتبويب
// ============================================================
const azkarList = document.getElementById("azkarList");
const catTitle = document.getElementById("catTitle");
const catDesc = document.getElementById("catDesc");
const catIcon = document.getElementById("catIcon");
const progressFill = document.getElementById("progressFill");
const azkarSearch = document.getElementById("azkarSearch");

function renderCategory(cat) {
  currentCat = cat;
  if (azkarSearch) azkarSearch.value = "";

  const data = azkarData[cat];
  catTitle.textContent = data.title;
  catDesc.textContent = data.desc;
  catIcon.textContent = data.icon;
  azkarList.innerHTML = "";

  data.items.forEach((item, idx) => {
    const done = getItemProgress(cat, idx);
    const li = document.createElement("li");
    li.className = "zikr-card" + (done >= item.count ? " done" : "");
    li.dataset.idx = idx;

    li.innerHTML = `
      <span class="zikr-index">${idx + 1} / ${data.items.length}</span>
      <p class="zikr-text" style="font-size: ${fontScale}rem;">${item.text}</p>
      ${item.fadl ? `<p class="zikr-fadl">${item.fadl}</p>` : ""}
      <div class="zikr-footer">
        <div class="zikr-actions">
          <button class="count-btn" data-idx="${idx}">
            <span class="btn-content">عدّ الذكر <span class="count-badge">${done} / ${item.count}</span></span>
          </button>
          <button class="copy-btn" data-idx="${idx}" title="نسخ الذكر">
            <span class="btn-content">📋 نسخ</span>
          </button>
        </div>
        <div class="mini-beads">${renderMiniBeads(item.count, done)}</div>
      </div>
    `;
    azkarList.appendChild(li);
  });

  updateProgressBar();
}

function renderMiniBeads(total, done) {
  const shown = Math.min(total, 10);
  let html = "";
  for (let i = 0; i < shown; i++) {
    const on = total <= 10 ? i < done : (i + 1) / shown <= done / total;
    html += `<span class="mini-bead ${on ? "on" : ""}"></span>`;
  }
  return html;
}

function updateProgressBar() {
  const data = azkarData[currentCat];
  if (!data) return;
  let totalDone = 0, totalNeeded = 0;
  data.items.forEach((item, idx) => {
    totalNeeded += item.count;
    totalDone += Math.min(getItemProgress(currentCat, idx), item.count);
  });
  const pct = totalNeeded ? (totalDone / totalNeeded) * 100 : 0;
  progressFill.style.width = pct + "%";
}

// البحث في الأذكار
if (azkarSearch) {
  let searchDebounce;
  azkarSearch.addEventListener("input", (e) => {
    clearTimeout(searchDebounce);
    const q = e.target.value.trim().toLowerCase();
    searchDebounce = setTimeout(() => {
      const cards = document.querySelectorAll(".zikr-card");
      cards.forEach((card) => {
        const text = card.querySelector(".zikr-text")?.textContent.toLowerCase() || "";
        const fadl = card.querySelector(".zikr-fadl")?.textContent.toLowerCase() || "";
        card.style.display = (text.includes(q) || fadl.includes(q)) ? "block" : "none";
      });
    }, 150);
  });
}

// إعادة ضبط قسم الأذكار
document.getElementById("resetCatBtn")?.addEventListener("click", () => {
  if (confirm("هل تريد إعادة ضبط جميع عدّادات هذا القسم؟")) {
    delete progress[currentCat];
    saveProgress(progress);
    renderCategory(currentCat);
  }
});

function updateCardUI(idx, item, done) {
  const li = azkarList.querySelector(`li[data-idx="${idx}"]`);
  if (!li) return;
  li.classList.toggle("done", done >= item.count);
  const badge = li.querySelector(".count-badge");
  if (badge) badge.textContent = `${done} / ${item.count}`;
  const beadsWrap = li.querySelector(".mini-beads");
  if (beadsWrap) beadsWrap.innerHTML = renderMiniBeads(item.count, done);
}

azkarList.addEventListener("click", (e) => {
  const btn = e.target.closest(".count-btn");
  if (btn) {
    const idx = parseInt(btn.dataset.idx, 10);
    const item = azkarData[currentCat].items[idx];
    let done = getItemProgress(currentCat, idx);
    done = done >= item.count ? 0 : done + 1;
    setItemProgress(currentCat, idx, done);
    if (navigator.vibrate) navigator.vibrate(15);
    // Only the tapped card + progress bar are updated - rebuilding the entire
    // list (15-20+ cards) on every single tap was the main cause of lag.
    updateCardUI(idx, item, done);
    updateProgressBar();
    return;
  }

  const copyBtn = e.target.closest(".copy-btn");
  if (copyBtn) {
    const idx = parseInt(copyBtn.dataset.idx, 10);
    const item = azkarData[currentCat].items[idx];
    let textToCopy = item.text + (item.fadl ? `\n\n📌 الفضل: ${item.fadl}` : "");
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.querySelector('.btn-content').innerHTML = "✓ تم النسخ";
      copyBtn.classList.add("copied");
      setTimeout(() => { copyBtn.querySelector('.btn-content').innerHTML = "📋 نسخ"; copyBtn.classList.remove("copied"); }, 1500);
    });
  }
});

// التحكم بالخط
function updateFontSize(newScale) {
  fontScale = Math.max(0.9, Math.min(2.0, newScale));
  localStorage.setItem("azkar_font_scale", fontScale);
  document.querySelectorAll(".zikr-text").forEach((el) => { el.style.fontSize = fontScale + "rem"; });
}
document.getElementById("incFontBtn")?.addEventListener("click", () => updateFontSize(fontScale + 0.1));
document.getElementById("decFontBtn")?.addEventListener("click", () => updateFontSize(fontScale - 0.1));
document.getElementById("resetFontBtn")?.addEventListener("click", () => updateFontSize(1.18));

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCategory(btn.dataset.cat);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

renderCategory(currentCat);

// ============================================================
// القرآن الكريم الصوت والمكتوب (mp3quran)
// ============================================================
let allSurahs = [];
let recitersList = [];
let selectedServerUrl = "";
let currentSurahNumber = 1;

const quranDrawer = document.getElementById("quranDrawer");
const openQuranFab = document.getElementById("openQuranFab");
const closeQuranDrawer = document.getElementById("closeQuranDrawer");

if (openQuranFab && quranDrawer) {
  openQuranFab.addEventListener("click", () => {
    quranDrawer.classList.add("open");
    if (allSurahs.length === 0) {
      fetchSurahs();
      fetchReciters();
    }
  });

  closeQuranDrawer?.addEventListener("click", () => {
    quranDrawer.classList.remove("open");
  });
}

async function fetchSurahs() {
  const container = document.getElementById("surahList");
  container.innerHTML = "<p style='color: white; grid-column: 1/-1;'>جاري تحميل سور القرآن الكريم...</p>";
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await res.json();
    allSurahs = data.data;
    renderSurahList(allSurahs);
  } catch (err) {
    container.innerHTML = "<p style='color: white; grid-column: 1/-1;'>حدث خطأ أثناء تحميل السور.</p>";
  }
}

function renderSurahList(surahs) {
  const container = document.getElementById("surahList");
  container.innerHTML = "";
  surahs.forEach((surah) => {
    const card = document.createElement("div");
    card.className = "surah-card card";
    card.innerHTML = `
      <div class="card__content">
        <span class="surah-num">سورة رقم ${surah.number}</span>
        <h3 class="surah-name">${surah.name}</h3>
        <span class="surah-info">${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • ${surah.numberOfAyahs} آية</span>
      </div>
    `;
    card.addEventListener("click", () => loadSurahContent(surah.number, surah.name));
    container.appendChild(card);
  });
}

async function loadSurahContent(surahNum, surahName) {
  currentSurahNumber = surahNum;
  document.getElementById("surahList").style.display = "none";
  document.getElementById("quranSearch").style.display = "none";
  const surahView = document.getElementById("surahView");
  const surahContent = document.getElementById("surahContent");
  
  surahView.style.display = "block";
  document.getElementById("surahTitle").textContent = surahName;
  surahContent.innerHTML = "جاري تحميل الآيات...";

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
    const data = await res.json();
    let ayahsText = "";
    data.data.ayahs.forEach((ayah) => {
      ayahsText += `${ayah.text} ﴿${ayah.numberInSurah}﴾ `;
    });
    surahContent.textContent = ayahsText;
  } catch (err) {
    surahContent.textContent = "حدث خطأ أثناء جلب آيات السورة.";
  }
}

async function fetchReciters() {
  const select = document.getElementById("reciterSelect");
  try {
    const res = await fetch("https://mp3quran.net/api/v3/reciters?language=ar");
    const data = await res.json();
    recitersList = data.reciters;
    select.innerHTML = '<option value="">اختر القارئ للتشغيل الصوتي...</option>';
    recitersList.forEach((reciter) => {
      if (reciter.moshaf && reciter.moshaf.length > 0) {
        const opt = document.createElement("option");
        opt.value = reciter.id;
        opt.textContent = reciter.name;
        select.appendChild(opt);
      }
    });
  } catch (e) {
    select.innerHTML = '<option value="">فشل جلب القراء</option>';
  }
}

document.getElementById("reciterSelect")?.addEventListener("change", (e) => {
  const reciter = recitersList.find(r => r.id == e.target.value);
  if (reciter && reciter.moshaf[0]) {
    selectedServerUrl = reciter.moshaf[0].server;
    playCurrentSurahAudio();
  }
});

function playCurrentSurahAudio() {
  const audio = document.getElementById("quranAudio");
  if (!selectedServerUrl) {
    alert("يرجى اختيار القارئ أولاً من القائمة الأفقية بالأعلى.");
    return;
  }
  const formattedNum = String(currentSurahNumber).padStart(3, '0');
  audio.src = `${selectedServerUrl}${formattedNum}.mp3`;
  audio.play().catch(e => console.log("في انتظار التفاعل"));
}

document.getElementById("playSurahBtn")?.addEventListener("click", playCurrentSurahAudio);

document.getElementById("backToSurahList")?.addEventListener("click", () => {
  document.getElementById("surahView").style.display = "none";
  document.getElementById("surahList").style.display = "grid";
  document.getElementById("quranSearch").style.display = "block";
});

document.getElementById("quranSearch")?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderSurahList(allSurahs.filter(s => s.name.includes(q)));
});

// ============================================================
// المسبحة الإلكترونية
// ============================================================
const tasbihOverlay = document.getElementById("tasbihOverlay");
const openTasbihBtn = document.getElementById("openTasbih");
const closeTasbihBtn = document.getElementById("closeTasbih");
const dragBead = document.getElementById("dragBead");
const beadsTrack = document.getElementById("beadsTrack");
const counterNumber = document.getElementById("counterNumber");
const counterRound = document.getElementById("counterRound");
const ringFg = document.getElementById("ringFg");

let tasbihCount = 0;
let tasbihRound = 1;

function updateTasbihDisplay() {
  counterNumber.textContent = tasbihCount;
  counterRound.textContent = "الدورة: " + tasbihRound;
  const offset = 326.7 - ((tasbihCount % 33) / 33) * 326.7;
  ringFg.style.strokeDasharray = 326.7;
  ringFg.style.strokeDashoffset = tasbihCount > 0 && tasbihCount % 33 === 0 ? 0 : offset;
}

function incrementTasbih() {
  tasbihCount++;
  if (tasbihCount % 33 === 0) tasbihRound++;
  if (navigator.vibrate) navigator.vibrate(12);
  updateTasbihDisplay();
}

openTasbihBtn.addEventListener("click", () => tasbihOverlay.classList.add("open"));
closeTasbihBtn.addEventListener("click", () => tasbihOverlay.classList.remove("open"));

document.querySelectorAll(".dhikr-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".dhikr-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    document.getElementById("currentDhikrText").textContent = chip.dataset.text;
  });
});

document.getElementById("counterMinus")?.addEventListener("click", () => { if (tasbihCount > 0) tasbihCount--; updateTasbihDisplay(); });
document.getElementById("counterReset")?.addEventListener("click", () => { tasbihCount = 0; tasbihRound = 1; updateTasbihDisplay(); });

// السحب
let dragging = false, startY = 0, trackTop = 16;
dragBead.addEventListener("mousedown", (e) => { dragging = true; startY = e.clientY; dragBead.classList.remove("snap-back"); });
document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  let delta = Math.max(0, Math.min(e.clientY - startY, beadsTrack.clientHeight - 60));
  dragBead.style.top = (trackTop + delta) + "px";
});
document.addEventListener("mouseup", () => {
  if (!dragging) return;
  dragging = false;
  if (parseFloat(dragBead.style.top || trackTop) > beadsTrack.clientHeight * 0.5) incrementTasbih();
  dragBead.classList.add("snap-back");
  dragBead.style.top = trackTop + "px";
});

dragBead.addEventListener("touchstart", (e) => { dragging = true; startY = e.touches[0].clientY; dragBead.classList.remove("snap-back"); }, {passive:true});
document.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  let delta = Math.max(0, Math.min(e.touches[0].clientY - startY, beadsTrack.clientHeight - 60));
  dragBead.style.top = (trackTop + delta) + "px";
}, {passive:true});
document.addEventListener("touchend", () => {
  if (!dragging) return;
  dragging = false;
  if (parseFloat(dragBead.style.top || trackTop) > beadsTrack.clientHeight * 0.5) incrementTasbih();
  dragBead.classList.add("snap-back");
  dragBead.style.top = trackTop + "px";
});

dragBead.addEventListener("click", () => incrementTasbih());
updateTasbihDisplay();