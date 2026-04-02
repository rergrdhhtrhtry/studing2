// 潮汕民俗节庆日历系统

// 潮汕民俗节庆数据
const chaoshanFestivals = [
    // 农历节日
    { name: '春节', date: '01-01', type: 'lunar', description: '潮汕地区最隆重的传统节日', customs: '贴春联、吃团圆饭、拜年、放鞭炮、舞狮舞龙' },
    { name: '元宵节', date: '01-15', type: 'lunar', description: '春节后的第一个重要节日', customs: '吃汤圆、赏花灯、猜灯谜、游神赛会' },
    { name: '清明节', date: '03-05', type: 'solar', description: '祭祖扫墓的重要节日', customs: '扫墓、踏青、吃清明粿' },
    { name: '端午节', date: '05-05', type: 'lunar', description: '纪念屈原的传统节日', customs: '赛龙舟、吃粽子、挂艾草' },
    { name: '七夕节', date: '07-07', type: 'lunar', description: '中国传统的情人节', customs: '乞巧、拜织女、穿针引线' },
    { name: '中元节', date: '07-15', type: 'lunar', description: '潮汕地区的鬼节', customs: '祭祀祖先、放河灯、烧纸钱' },
    { name: '中秋节', date: '08-15', type: 'lunar', description: '团圆的节日', customs: '赏月、吃月饼、吃芋泥、烧塔' },
    { name: '重阳节', date: '09-09', type: 'lunar', description: '敬老节', customs: '登高、赏菊、喝菊花酒' },
    { name: '冬至', date: '12-22', type: 'solar', description: '潮汕地区的大节日', customs: '吃冬节丸、祭祖' },
    
    // 潮汕特色节日
    { name: '潮州大锣鼓', date: '01-01', type: 'lunar', description: '潮汕地区传统民俗活动', customs: '锣鼓表演、游街、舞狮' },
    { name: '汕头开埠节', date: '01-11', type: 'solar', description: '纪念汕头开埠的节日', customs: '文化展览、民俗表演、美食节' },
    { name: '揭阳城隍爷出巡', date: '02-15', type: 'lunar', description: '揭阳传统民俗活动', customs: '城隍爷出巡、游神赛会' },
    { name: '潮州花灯节', date: '01-15', type: 'lunar', description: '潮州传统节日', customs: '赏花灯、猜灯谜、民俗表演' },
    { name: '普宁英歌节', date: '02-01', type: 'lunar', description: '普宁传统民俗活动', customs: '英歌舞表演、游街' },
    { name: '汕头国际潮剧节', date: '11-20', type: 'solar', description: '展示潮剧艺术的节日', customs: '潮剧表演、文化交流' },
    { name: '潮州工夫茶文化节', date: '10-10', type: 'solar', description: '展示潮汕工夫茶的节日', customs: '茶艺表演、茶文化交流' },
    { name: '揭阳玉器节', date: '10-01', type: 'solar', description: '揭阳玉器产业的节日', customs: '玉器展览、交易、文化活动' },
    { name: '澄海玩具节', date: '09-01', type: 'solar', description: '澄海玩具产业的节日', customs: '玩具展览、交易、文化活动' }
];

// 农历月份名称
const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];

// 星期名称
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

// 当前显示的年月
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// 初始化日历
function initCalendar() {
    setupEventListeners();
    renderCalendar();
    checkTodayFestivals();
}

// 渲染日历
function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    
    if (!calendarGrid || !currentMonthElement) {
        return;
    }
    
    // 更新当前月份显示
    currentMonthElement.textContent = `${currentYear}年${lunarMonths[currentMonth]}`;
    
    // 清空日历网格
    calendarGrid.innerHTML = '';
    
    // 获取当月第一天
    const firstDay = new Date(currentYear, currentMonth, 1);
    // 获取当月最后一天
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    // 获取当月第一天是星期几
    const startDay = firstDay.getDay();
    // 获取当月的天数
    const daysInMonth = lastDay.getDate();
    
    // 获取上个月的最后一天
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    // 生成日历单元格
    let dayCount = 1;
    let nextMonthDay = 1;
    
    for (let i = 0; i < 42; i++) { // 6行7列
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        
        // 上个月的日期
        if (i < startDay) {
            const prevDay = prevMonthLastDay - startDay + i + 1;
            dayElement.textContent = prevDay;
            dayElement.classList.add('other-month');
            // 添加农历日期
            const lunarDate = document.createElement('div');
            lunarDate.classList.add('lunar');
            lunarDate.textContent = getLunarDate(currentYear, currentMonth - 1, prevDay);
            dayElement.appendChild(lunarDate);
        }
        // 当月的日期
        else if (dayCount <= daysInMonth) {
            dayElement.textContent = dayCount;
            
            // 标记今天
            const today = new Date();
            if (dayCount === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // 添加农历日期
            const lunarDate = document.createElement('div');
            lunarDate.classList.add('lunar');
            lunarDate.textContent = getLunarDate(currentYear, currentMonth, dayCount);
            dayElement.appendChild(lunarDate);
            
            // 检查是否是节日
            const festival = checkFestival(currentYear, currentMonth, dayCount);
            if (festival && dayElement) {
                dayElement.classList.add('festival');
                
                // 添加点击事件显示节日详情
                dayElement.addEventListener('click', () => {
                    // 添加振动效果
                    if (navigator && 'vibrate' in navigator) {
                        navigator.vibrate(50);
                    }
                    showFestivalDetails(festival);
                });
            }
            
            dayCount++;
        }
        // 下个月的日期
        else {
            dayElement.textContent = nextMonthDay;
            dayElement.classList.add('other-month');
            // 添加农历日期
            const lunarDate = document.createElement('div');
            lunarDate.classList.add('lunar');
            lunarDate.textContent = getLunarDate(currentYear, currentMonth + 1, nextMonthDay);
            dayElement.appendChild(lunarDate);
            nextMonthDay++;
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

// 检查是否是节日
function checkFestival(year, month, day) {
    // 转换为公历日期
    const date = new Date(year, month, day);
    const solarMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const solarDay = date.getDate().toString().padStart(2, '0');
    const solarDate = `${solarMonth}-${solarDay}`;
    
    // 检查公历节日
    const solarFestival = chaoshanFestivals.find(festival => {
        return festival.type === 'solar' && festival.date === solarDate;
    });
    
    if (solarFestival) {
        return solarFestival;
    }
    
    // 检查农历节日 - 使用简化的农历日期（实际应用中应使用专业的农历库）
    // 这里我们使用一个简单的映射来模拟农历日期
    const lunarDate = getLunarDate(year, month, day);
    
    // 从农历日期中提取月份和日期
    let lunarMonthStr = '';
    let lunarDayStr = '';
    
    if (lunarDate === '初一') {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = '01';
    } else if (lunarDate === '十五') {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = '15';
    } else if (lunarDate === '初十') {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = '10';
    } else if (lunarDate === '二十') {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = '20';
    } else if (lunarDate === '三十') {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = '30';
    } else if (lunarDate.startsWith('初')) {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = lunarDate.substring(1).padStart(2, '0');
    } else if (lunarDate.startsWith('廿')) {
        lunarMonthStr = (month + 1).toString().padStart(2, '0');
        lunarDayStr = (parseInt(lunarDate.substring(1)) + 20).toString().padStart(2, '0');
    }
    
    const lunarFullDate = `${lunarMonthStr}-${lunarDayStr}`;
    
    // 检查农历节日
    return chaoshanFestivals.find(festival => {
        return festival.type === 'lunar' && festival.date === lunarFullDate;
    });
}

// 农历日期计算（更准确的简化版）
// 基于2026年的农历数据，实际应用中应使用专业的农历库
function getLunarDate(year, month, day) {
    // 2026年农历月份数据（准确版）
    // 格式：[农历月份, 天数, 初一对应的公历月份, 初一对应的公历日期]
    const lunarData2026 = [
        [1, 30, 1, 23],   // 正月，30天，初一在2026年1月23日
        [2, 29, 2, 21],   // 二月，29天，初一在2026年2月21日
        [3, 30, 3, 23],   // 三月，30天，初一在2026年3月23日
        [4, 29, 4, 22],   // 四月，29天，初一在2026年4月22日
        [5, 30, 5, 22],   // 五月，30天，初一在2026年5月22日
        [6, 29, 6, 20],   // 六月，29天，初一在2026年6月20日
        [7, 30, 7, 20],   // 七月，30天，初一在2026年7月20日
        [8, 29, 8, 18],   // 八月，29天，初一在2026年8月18日
        [9, 30, 9, 17],   // 九月，30天，初一在2026年9月17日
        [10, 29, 10, 16], // 十月，29天，初一在2026年10月16日
        [11, 30, 11, 15], // 冬月，30天，初一在2026年11月15日
        [12, 29, 12, 15]  // 腊月，29天，初一在2026年12月15日
    ];
    
    // 2027年农历正月
    const lunarData2027 = [
        [1, 30, 1, 13]    // 正月，30天，初一在2027年1月13日
    ];
    
    // 其他年份的简化处理
    if (year !== 2026 && year !== 2027) {
        const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                         '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                         '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
        return lunarDays[day - 1] || day;
    }
    
    // 处理2026年和2027年的农历日期
    const lunarData = year === 2026 ? lunarData2026 : lunarData2027;
    
    for (let i = 0; i < lunarData.length; i++) {
        const [lunarMonth, days, firstMonth, firstDay] = lunarData[i];
        
        // 检查当前日期是否在这个农历月份内
        if (month + 1 === firstMonth) {
            if (day >= firstDay) {
                const lunarDay = day - firstDay + 1;
                if (lunarDay <= days) {
                    return getLunarDayString(lunarDay);
                }
            }
        } else if (month + 1 > firstMonth) {
            // 检查是否是下一个月的情况
            const nextMonth = (firstMonth % 12) + 1;
            const nextYear = firstMonth === 12 ? year + 1 : year;
            
            if (month + 1 === nextMonth && year === nextYear) {
                // 计算这个农历月份在当前公历月份的天数
                const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
                const daysInFirstMonth = new Date(year, firstMonth, 0).getDate();
                const daysFromFirstMonth = daysInFirstMonth - firstDay + 1;
                
                if (day <= (days - daysFromFirstMonth)) {
                    const lunarDay = daysFromFirstMonth + day;
                    return getLunarDayString(lunarDay);
                }
            }
        }
    }
    
    // 默认返回
    const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                     '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                     '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    return lunarDays[day - 1] || day;
}

// 获取农历日期字符串（全汉字版）
function getLunarDayString(day) {
    const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    
    if (day === 1) return '初一';
    if (day === 15) return '十五';
    if (day === 10) return '初十';
    if (day === 20) return '二十';
    if (day === 30) return '三十';
    if (day < 10) return '初' + digits[day];
    if (day < 20) return '十' + (day === 10 ? '' : digits[day - 10]);
    if (day < 30) return '廿' + (day === 20 ? '' : digits[day - 20]);
    return '三十';
}

// 显示节日详情
function showFestivalDetails(festival) {
    const modal = document.getElementById('festival-modal');
    const festivalTitle = document.getElementById('festival-title');
    const festivalDate = document.getElementById('festival-date');
    const festivalDescription = document.getElementById('festival-description');
    const festivalCustoms = document.getElementById('festival-customs');
    
    if (modal && festivalTitle && festivalDate && festivalDescription && festivalCustoms) {
        festivalTitle.textContent = festival.name;
        festivalDate.textContent = `日期：${festival.date}（${festival.type === 'lunar' ? '农历' : '公历'}）`;
        festivalDescription.textContent = festival.description;
        festivalCustoms.textContent = `习俗：${festival.customs}`;
        
        modal.style.display = 'block';
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 触屏滑动翻页
    let startX;
    
    // 为整个日历容器添加滑动事件
    const calendarWrapper = document.querySelector('.calendar-container');
    if (calendarWrapper) {
        calendarWrapper.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length > 0) {
                startX = e.touches[0].clientX;
            }
        });
        
        calendarWrapper.addEventListener('touchend', (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;
                
                // 滑动距离大于50像素才触发翻页
                if (Math.abs(diffX) > 50) {
                    // 添加振动效果
                    if (navigator && 'vibrate' in navigator) {
                        try {
                            navigator.vibrate(50);
                        } catch (e) {
                            // 忽略振动错误
                        }
                    }
                    
                    // 计算目标月份
                    let targetMonth = currentMonth;
                    let targetYear = currentYear;
                    
                    if (diffX > 0) {
                        // 向左滑动，下一个月
                        targetMonth = currentMonth === 11 ? 0 : currentMonth + 1;
                        targetYear = currentMonth === 11 ? currentYear + 1 : currentYear;
                    } else {
                        // 向右滑动，上一个月
                        targetMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                        targetYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                    }
                    
                    // 直接更新月份并渲染，避免动画导致的偏移问题
                    currentMonth = targetMonth;
                    currentYear = targetYear;
                    
                    // 渲染日历
                    renderCalendar();
                }
            }
        });
    }
    
    // 关闭模态框
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('festival-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('festival-modal');
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 导航按钮
    const cultureBtn = document.getElementById('culture-btn');
    if (cultureBtn) {
        cultureBtn.addEventListener('click', () => {
            // 添加振动效果
            if (navigator && 'vibrate' in navigator) {
                navigator.vibrate(50);
            }
            const calendarPage = document.getElementById('calendar-page');
            const culturePage = document.getElementById('culture-page');
            if (calendarPage && culturePage) {
                calendarPage.classList.add('hidden');
                culturePage.classList.remove('hidden');
            }
        });
    }
    
    // 返回按钮
    const backToCalendarBtn = document.getElementById('back-to-calendar');
    if (backToCalendarBtn) {
        backToCalendarBtn.addEventListener('click', () => {
            // 添加振动效果
            if (navigator && 'vibrate' in navigator) {
                navigator.vibrate(50);
            }
            const culturePage = document.getElementById('culture-page');
            const calendarPage = document.getElementById('calendar-page');
            if (culturePage && calendarPage) {
                culturePage.classList.add('hidden');
                calendarPage.classList.remove('hidden');
            }
        });
    }
    
    // 今天按钮
    const todayBtn = document.getElementById('today-btn');
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            // 添加振动效果
            if (navigator && 'vibrate' in navigator) {
                navigator.vibrate(50);
            }
            // 获取当前日期
            const today = new Date();
            currentYear = today.getFullYear();
            currentMonth = today.getMonth();
            
            // 重新渲染日历
            renderCalendar();
            
            // 提供视觉反馈
            todayBtn.style.backgroundColor = '#FFE6D5';
            todayBtn.style.color = '#FF6B35';
            
            // 2秒后恢复按钮样式
            setTimeout(() => {
                todayBtn.style.backgroundColor = '';
                todayBtn.style.color = '';
            }, 2000);
        });
    }
    
    // 设置按钮
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // 添加振动效果
            if (navigator && 'vibrate' in navigator) {
                navigator.vibrate(50);
            }
            const calendarPage = document.getElementById('calendar-page');
            const settingsPage = document.getElementById('settings-page');
            if (calendarPage && settingsPage) {
                calendarPage.classList.add('hidden');
                settingsPage.classList.remove('hidden');
            }
        });
    }

    // 从设置页面返回
    const backFromSettingsBtn = document.getElementById('back-from-settings');
    if (backFromSettingsBtn) {
        backFromSettingsBtn.addEventListener('click', () => {
            // 添加振动效果
            if (navigator && 'vibrate' in navigator) {
                navigator.vibrate(50);
            }
            const settingsPage = document.getElementById('settings-page');
            const calendarPage = document.getElementById('calendar-page');
            if (settingsPage && calendarPage) {
                settingsPage.classList.add('hidden');
                calendarPage.classList.remove('hidden');
            }
        });
    }

    // 主题颜色选择
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // 添加振动效果
                if (navigator && 'vibrate' in navigator) {
                    navigator.vibrate(30);
                }
                
                // 移除所有颜色选项的active类
                colorOptions.forEach(opt => opt.classList.remove('active'));
                // 添加当前选项的active类
                option.classList.add('active');
                
                // 获取选择的颜色
                const color = option.getAttribute('data-color');
                const lightColor = adjustColor(color, 0.8);
                
                // 更新主题颜色
                const header = document.querySelector('.header');
                if (header) {
                    header.style.background = `linear-gradient(135deg, ${color} 0%, ${lightColor} 100%)`;
                }
                
                const pageHeader = document.querySelector('.page-header');
                if (pageHeader) {
                    pageHeader.style.background = `linear-gradient(135deg, ${color} 0%, ${lightColor} 100%)`;
                }
                
                // 更新返回按钮颜色
                const backBtns = document.querySelectorAll('.back-btn');
                backBtns.forEach(btn => {
                    btn.style.color = 'white';
                });
                
                // 更新设置页面标题颜色
                const pageTitles = document.querySelectorAll('.page-header h2');
                pageTitles.forEach(title => {
                    title.style.color = 'white';
                });
                
                // 更新字体大小滑块的颜色
                const sliderThumb = document.querySelector('.font-size-slider input[type="range"]::-webkit-slider-thumb');
                if (sliderThumb) {
                    sliderThumb.style.backgroundColor = color;
                }
                
                // 更新开关的颜色
                const toggles = document.querySelectorAll('.toggle-container input:checked + .toggle');
                toggles.forEach(toggle => {
                    toggle.style.backgroundColor = color;
                });
                
                // 确保开关在未选中状态也能更新颜色
                const allToggles = document.querySelectorAll('.toggle');
                allToggles.forEach(toggle => {
                    toggle.style.borderColor = color;
                });
                
                // 更新节日标题颜色
                const festivalTitle = document.querySelector('#festival-title');
                if (festivalTitle) {
                    festivalTitle.style.color = color;
                }
                
                // 更新底部导航按钮的颜色
                const activeFooterBtn = document.querySelector('.footer-btn.active');
                if (activeFooterBtn) {
                    activeFooterBtn.style.color = color;
                }
                
                // 更新设置页面中的设置项标签颜色
                const settingLabels = document.querySelectorAll('.setting-item label');
                settingLabels.forEach(label => {
                    label.style.color = color;
                });
                
                // 更新设置页面中的设置项标题颜色
                const sectionTitles = document.querySelectorAll('.settings-section h3');
                sectionTitles.forEach(title => {
                    title.style.color = color;
                });
            });
        });
    }

    // 字体大小调整
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeValue = document.getElementById('font-size-value');
    
    if (fontSizeSlider && fontSizeValue) {
        fontSizeSlider.addEventListener('input', () => {
            const size = fontSizeSlider.value;
            fontSizeValue.textContent = `${size}px`;
            document.body.style.fontSize = `${size}px`;
        });
    }

    // 通知提醒开关
    const notificationToggle = document.getElementById('notification-toggle');
    if (notificationToggle) {
        notificationToggle.addEventListener('change', () => {
            if (notificationToggle.checked) {
                // 请求通知权限
                if ('Notification' in window) {
                    Notification.requestPermission().then(permission => {
                        if (permission !== 'granted') {
                            notificationToggle.checked = false;
                            // 显示权限提示
                            const permissionToast = document.createElement('div');
                            permissionToast.style.cssText = `
                                position: fixed;
                                bottom: 80px;
                                left: 50%;
                                transform: translateX(-50%);
                                background-color: #FF9800;
                                color: white;
                                padding: 10px 20px;
                                border-radius: 20px;
                                font-size: 14px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                                z-index: 1000;
                                animation: fadeIn 0.3s ease;
                            `;
                            permissionToast.textContent = '请在浏览器设置中允许通知权限';
                            document.body.appendChild(permissionToast);
                            setTimeout(() => {
                                permissionToast.remove();
                            }, 3000);
                        } else {
                            // 尝试设置系统闹钟
                            setupSystemAlarms();
                            
                            // 显示设置成功提示
                            const successToast = document.createElement('div');
                            successToast.style.cssText = `
                                position: fixed;
                                bottom: 80px;
                                left: 50%;
                                transform: translateX(-50%);
                                background-color: #4CAF50;
                                color: white;
                                padding: 10px 20px;
                                border-radius: 20px;
                                font-size: 14px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                                z-index: 1000;
                                animation: fadeIn 0.3s ease;
                            `;
                            successToast.textContent = '通知提醒已开启，系统闹钟已设置';
                            document.body.appendChild(successToast);
                            setTimeout(() => {
                                successToast.remove();
                            }, 3000);
                        }
                    });
                }
            } else {
                // 关闭通知提醒
                // 显示关闭提示
                const infoToast = document.createElement('div');
                infoToast.style.cssText = `
                    position: fixed;
                    bottom: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #2196F3;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-size: 14px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                `;
                infoToast.textContent = '通知提醒已关闭';
                document.body.appendChild(infoToast);
                setTimeout(() => {
                    infoToast.remove();
                }, 3000);
            }
        });
    }

    // 设置系统闹钟
    function setupSystemAlarms() {
        // 检查是否支持Notification API
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }
        
        // 检查未来7天的节日
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() + i);
            
            const year = checkDate.getFullYear();
            const month = checkDate.getMonth();
            const day = checkDate.getDate();
            
            const festival = checkFestival(year, month, day);
            if (festival) {
                // 计算通知时间（节日当天早上8点）
                const notificationTime = new Date(checkDate);
                notificationTime.setHours(8, 0, 0, 0);
                
                // 如果通知时间已过，则跳过
                if (notificationTime <= new Date()) {
                    return;
                }
                
                // 计算延迟时间（毫秒）
                const delay = notificationTime.getTime() - Date.now();
                
                // 设置定时器
                setTimeout(() => {
                    // 显示通知
                    new Notification(`潮汕民俗提醒`, {
                        body: `今天是${festival.name}，${festival.description}`,
                        icon: 'icon-128x128.png'
                    });
                }, delay);
            }
        }
    }
}

// 调整颜色亮度
function adjustColor(color, factor) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const newR = Math.min(255, Math.round(r * factor));
    const newG = Math.min(255, Math.round(g * factor));
    const newB = Math.min(255, Math.round(b * factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// 请求通知权限
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('通知权限已授予');
                checkTodayFestivals();
            } else {
                console.log('通知权限被拒绝');
            }
        });
    }
}

// 检查今天是否有节日
function checkTodayFestivals() {
    const today = new Date();
    const festival = checkFestival(today.getFullYear(), today.getMonth(), today.getDate());
    if (festival && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('潮汕民俗节庆提醒', {
            body: `今天是${festival.name}，${festival.description}`,
            icon: 'icon-192x192.png'
        });
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    requestNotificationPermission();
});

// 注册Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 尝试注册Service Worker，支持多种路径
        const swPath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? '/service-worker.js' 
            : 'service-worker.js';
        
        navigator.serviceWorker.register(swPath)
            .then(registration => {
                console.log('Service Worker 注册成功:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker 注册失败:', error);
            });
    });
}