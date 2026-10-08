#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
智慧客房App答辩PPT生成脚本
生成包含项目背景、结构、截图展示、技术栈的答辩PPT
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu, Cm
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

# ==================== 配置 ====================
TUPIAN_DIR = r"F:\ZHKF\tupian"
OUTPUT_PATH = r"F:\ZHKF\智慧客房App答辩PPT.pptx"

# 图片文件列表（按名称排序）
image_files = sorted([
    f for f in os.listdir(TUPIAN_DIR) if f.endswith('.png')
])

# 配色方案
GOLD = RGBColor(0xD4, 0xA5, 0x74)
DARK_BG = RGBColor(0x1A, 0x12, 0x0E)
MEDIUM_BG = RGBColor(0x2D, 0x24, 0x1A)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GOLD = RGBColor(0xFF, 0xD7, 0x00)
SOFT_WHITE = RGBColor(0xEE, 0xEE, 0xEE)
DARK_TEXT = RGBColor(0x33, 0x33, 0x33)
ACCENT_GRAY = RGBColor(0x99, 0x99, 0x99)

# ==================== 工具函数 ====================
def set_slide_bg(slide, color):
    """设置幻灯片背景色"""
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_gold_line(slide, left, top, width, height=Pt(2)):
    """添加金色装饰线"""
    shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, left, top, width, height
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = GOLD
    shape.line.fill.background()
    return shape

def add_text_box(slide, left, top, width, height, text, font_size=Pt(14),
                 color=WHITE, bold=False, alignment=PP_ALIGN.LEFT, font_name='微软雅黑'):
    """添加文本框"""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = font_size
    p.font.color.rgb = color
    p.font.bold = bold
    p.font.name = font_name
    p.alignment = alignment
    return txBox

def add_title_bar(slide, title_text, subtitle_text=None):
    """添加统一的标题栏"""
    # 顶部装饰线
    add_gold_line(slide, Inches(0), Inches(0), Inches(13.33), Pt(4))
    # 标题
    add_text_box(slide, Inches(0.8), Inches(0.3), Inches(11), Inches(0.7),
                 title_text, font_size=Pt(30), bold=True, color=GOLD)
    if subtitle_text:
        add_text_box(slide, Inches(0.8), Inches(0.9), Inches(11), Inches(0.4),
                     subtitle_text, font_size=Pt(13), color=ACCENT_GRAY)
    # 分割线
    add_gold_line(slide, Inches(0.8), Inches(1.3), Inches(11.7), Pt(1))

def add_card(slide, left, top, width, height, bg_color=None):
    """添加卡片背景"""
    shape = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height
    )
    if bg_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
    shape.line.fill.background()
    return shape


# ==================== 创建PPT ====================
prs = Presentation()
prs.slide_width = Inches(13.33)
prs.slide_height = Inches(7.5)

# ============================================================
# Slide 1: 封面
# ============================================================
slide1 = prs.slides.add_slide(prs.slide_layouts[6])  # 空白布局
set_slide_bg(slide1, DARK_BG)

# 顶部金色装饰线
add_gold_line(slide1, Inches(0), Inches(0), Inches(13.33), Pt(6))

# 主标题
add_text_box(slide1, Inches(1.5), Inches(1.8), Inches(10.3), Inches(1.2),
             '智慧客房', font_size=Pt(56), bold=True, color=GOLD,
             alignment=PP_ALIGN.CENTER)

# 副标题
add_text_box(slide1, Inches(1.5), Inches(2.9), Inches(10.3), Inches(0.8),
             'Smart Hotel Room Control System', font_size=Pt(24), color=WHITE,
             alignment=PP_ALIGN.CENTER)

# 分割线
add_gold_line(slide1, Inches(4), Inches(3.7), Inches(5.33), Pt(2))

# 项目描述
add_text_box(slide1, Inches(2), Inches(4.2), Inches(9.3), Inches(0.6),
             '基于 HarmonyOS 的酒店客房智能控制系统', font_size=Pt(18),
             color=SOFT_WHITE, alignment=PP_ALIGN.CENTER)

add_text_box(slide1, Inches(2), Inches(4.8), Inches(9.3), Inches(0.6),
             '广科·未来酒店  |  华为ICT学院专属智臻旅居体验', font_size=Pt(14),
             color=ACCENT_GRAY, alignment=PP_ALIGN.CENTER)

# 底部信息
add_text_box(slide1, Inches(1.5), Inches(6.0), Inches(10.3), Inches(0.5),
             'HarmonyOS  ·  MVVM架构  ·  V2状态管理  ·  Navigation导航  ·  多设备适配',
             font_size=Pt(12), color=ACCENT_GRAY, alignment=PP_ALIGN.CENTER)

add_gold_line(slide1, Inches(0), Inches(7.46), Inches(13.33), Pt(4))


# ============================================================
# Slide 2: 项目背景
# ============================================================
slide2 = prs.slides.add_slide(prs.slide_layouts[6])
set_slide_bg(slide2, DARK_BG)
add_title_bar(slide2, '项目背景', 'Project Background')

# 左侧：项目概述
add_card(slide2, Inches(0.8), Inches(1.7), Inches(5.8), Inches(5.2))
add_text_box(slide2, Inches(1.1), Inches(1.85), Inches(5.3), Inches(0.5),
             '📋 项目概述', font_size=Pt(20), bold=True, color=GOLD)

overview_text = (
    "智慧客房系统是一个基于 HarmonyOS 的酒店客房智能控制应用，"
    "旨在为酒店住客提供便捷、智能化的客房设备管理体验。\n\n"
    "🏨 应用场景：广科·未来酒店\n"
    "🎓 合作方：华为ICT学院\n"
    "📱 目标平台：HarmonyOS 6.0\n"
    "🖥️ 适配设备：手机 / 平板 / 折叠屏"
)
add_text_box(slide2, Inches(1.1), Inches(2.5), Inches(5.3), Inches(4.0),
             overview_text, font_size=Pt(14), color=WHITE)

# 右侧：核心功能
add_card(slide2, Inches(7.0), Inches(1.7), Inches(5.5), Inches(5.2))
add_text_box(slide2, Inches(7.3), Inches(1.85), Inches(5.0), Inches(0.5),
             '🎯 核心价值', font_size=Pt(20), bold=True, color=GOLD)

core_values = [
    '✅ 空调智能控制 —— 温度/模式/风速一键调节',
    '✅ 灯光场景管理 —— 明亮/柔和/阅读/温馨四模式',
    '✅ 窗帘电动控制 —— 布帘窗纱独立开关',
    '✅ 客房服务请求 —— 请勿打扰/清理/SOS',
    '✅ 晚安一键模式 —— 一键关闭所有灯光',
    '✅ 多设备自适应 —— 手机/平板/折叠屏适配',
]
y_pos = 2.5
for i, val in enumerate(core_values):
    add_text_box(slide2, Inches(7.3), Inches(y_pos + i * 0.55), Inches(5.0), Inches(0.5),
                 val, font_size=Pt(13), color=WHITE)

# 底部提示
add_text_box(slide2, Inches(0.8), Inches(7.0), Inches(11.7), Inches(0.4),
             '* 使用 Mock 模拟数据进行开发演示，预留真实 API 接口对接能力',
             font_size=Pt(11), color=ACCENT_GRAY, alignment=PP_ALIGN.RIGHT)


# ============================================================
# Slide 3: 项目架构
# ============================================================
slide3 = prs.slides.add_slide(prs.slide_layouts[6])
set_slide_bg(slide3, DARK_BG)
add_title_bar(slide3, '项目架构设计', 'Architecture Design')

# 架构图区域 - 三层架构
# 第一层: Products Layer
add_card(slide3, Inches(0.8), Inches(1.7), Inches(3.8), Inches(1.6))
add_text_box(slide3, Inches(1.1), Inches(1.85), Inches(3.3), Inches(0.5),
             '📦 产品层 Products', font_size=Pt(16), bold=True, color=GOLD)
add_text_box(slide3, Inches(1.1), Inches(2.3), Inches(3.3), Inches(0.8),
             '• phone 手机产品入口\n• 管理各功能模块依赖\n• 全局导航与路由编排',
             font_size=Pt(12), color=WHITE)

# 箭头1
add_text_box(slide3, Inches(4.8), Inches(2.1), Inches(0.5), Inches(0.5),
             '⬆', font_size=Pt(20), color=GOLD)

# 第二层: Features Layer
add_card(slide3, Inches(0.8), Inches(3.6), Inches(3.8), Inches(2.4))
add_text_box(slide3, Inches(1.1), Inches(3.78), Inches(3.3), Inches(0.5),
             '🧩 功能层 Features', font_size=Pt(16), bold=True, color=GOLD)

features_text = (
    '• login   —— 登录/鉴权\n'
    '• home    —— 首页/空调/场景\n'
    '• light   —— 灯光控制\n'
    '• curtain —— 窗帘控制\n'
    '• service —— 客房服务'
)
add_text_box(slide3, Inches(1.1), Inches(4.25), Inches(3.3), Inches(1.6),
             features_text, font_size=Pt(12), color=WHITE)

# 箭头2
add_text_box(slide3, Inches(4.8), Inches(4.4), Inches(0.5), Inches(0.5),
             '⬆', font_size=Pt(20), color=GOLD)

# 第三层: Commons Layer
add_card(slide3, Inches(0.8), Inches(6.3), Inches(3.8), Inches(1.0))
add_text_box(slide3, Inches(1.1), Inches(6.38), Inches(3.3), Inches(0.5),
             '🔧 公共层 Commons', font_size=Pt(16), bold=True, color=GOLD)
add_text_box(slide3, Inches(1.1), Inches(6.75), Inches(3.3), Inches(0.4),
             '• network • datastore • utils • uicomponents',
             font_size=Pt(11), color=WHITE)

# 右侧：MVVM架构详情
add_card(slide3, Inches(5.3), Inches(1.7), Inches(7.2), Inches(5.6))
add_text_box(slide3, Inches(5.6), Inches(1.85), Inches(6.6), Inches(0.5),
             '🏗️ MVVM 架构模式（每个Feature模块内部）', font_size=Pt(18), bold=True, color=GOLD)

mvvm_layers = [
    ('View 层', '#D4A574',
     '• LoginPage.ets / HomePage.ets\n• LightPage.ets / CurtainPage.ets\n• ServicePage.ets\n'
     '→ 使用 @ComponentV2 + @Builder 构建UI',
     Inches(5.6), Inches(2.45)),
    ('ViewModel 层', '#87CEEB',
     '• LoginViewModel.ets / HomeViewModel.ets\n• LightViewModel.ets / CurtainViewModel.ets\n• ServiceViewModel.ets\n'
     '→ 使用 @ObservedV2 + @Trace 管理状态',
     Inches(5.6), Inches(3.65)),
    ('Model 层', '#98FB98',
     '• LoginModel.ets / HomeModel.ets\n• LightModel.ets / CurtainModel.ets\n• ServiceModel.ets\n'
     '→ 数据结构定义与数据模型',
     Inches(5.6), Inches(4.85)),
]

for layer_name, layer_color, layer_desc, left, top in mvvm_layers:
    add_card(slide3, left, top, Inches(6.8), Inches(1.1))
    # 颜色标签
    tag = slide3.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left.inches + 0.15), Inches(top.inches + 0.12),
        Inches(1.2), Inches(0.36)
    )
    tag.fill.solid()
    tag.fill.fore_color.rgb = RGBColor(
        int(layer_color[1:3], 16), int(layer_color[3:5], 16), int(layer_color[5:7], 16)
    )
    tag.line.fill.background()
    tag_tf = tag.text_frame
    tag_tf.paragraphs[0].text = layer_name
    tag_tf.paragraphs[0].font.size = Pt(12)
    tag_tf.paragraphs[0].font.bold = True
    tag_tf.paragraphs[0].font.color.rgb = DARK_TEXT
    tag_tf.paragraphs[0].alignment = PP_ALIGN.CENTER

    add_text_box(slide3, Inches(left.inches + 1.55), Inches(top.inches + 0.08),
                 Inches(5.0), Inches(0.95),
                 layer_desc, font_size=Pt(11), color=WHITE)


# ============================================================
# Slide 4: 项目结构详细
# ============================================================
slide4 = prs.slides.add_slide(prs.slide_layouts[6])
set_slide_bg(slide4, DARK_BG)
add_title_bar(slide4, '项目代码结构', 'Project Code Structure')

code_structure = """
ZHKF/
├── AppScope/                    # 应用全局配置
├── products/phone/              # 📦 产品层——手机产品
│   └── src/main/ets/pages/
│       └── Index.ets            # 主入口：Navigation + Tabs导航
├── features/                    # 🧩 功能层——5大业务模块
│   ├── login/                   # 登录模块（房间号+用户名验证）
│   │   └── src/main/ets/
│   │       ├── model/LoginModel.ets
│   │       ├── view/LoginPage.ets
│   │       └── viewmodel/LoginViewModel.ets
│   ├── home/                    # 首页模块（空调/场景/服务/晚安）
│   │   └── src/main/ets/
│   │       ├── model/HomeModel.ets
│   │       ├── view/HomePage.ets
│   │       └── viewmodel/HomeViewModel.ets
│   ├── light/                   # 灯光模块（9路灯控+场景模式）
│   ├── curtain/                 # 窗帘模块（布帘+窗纱控制）
│   └── service/                 # 服务模块（勿扰/清理/SOS/退出）
├── commons/                     # 🔧 公共层——基础能力
│   ├── network/                 # 网络请求（API服务封装）
│   ├── datastore/               # 本地数据持久化
│   ├── utils/                   # 工具类 + MockDataService
│   └── uicomponents/            # 通用UI组件库
├── oh_modules/                  # 依赖（Hypium测试/Hamock）
├── build-profile.json5          # 构建配置（5.0.1 SDK）
└── 设计图.png                   # UI设计原型图
"""

txBox = slide4.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.6))
tf = txBox.text_frame
tf.word_wrap = True

# 手动设置等宽字体和格式
for i, line in enumerate(code_structure.strip().split('\n')):
    if i == 0:
        continue  # skip empty first line
    if i < len(tf.paragraphs):
        p = tf.paragraphs[i]
    else:
        p = tf.add_paragraph()

    p.text = line
    p.font.size = Pt(12)
    p.font.name = 'Consolas'
    p.space_after = Pt(1)
    p.space_before = Pt(1)

    if line.strip().startswith('ZHKF') or line.strip().startswith('├──') or line.strip().startswith('└──'):
        p.font.color.rgb = GOLD
    elif '#' in line:
        p.font.color.rgb = LIGHT_GOLD
    elif line.strip().startswith('│'):
        p.font.color.rgb = ACCENT_GRAY
    else:
        p.font.color.rgb = WHITE


# ============================================================
# Slide 5-9: App截图展示（5张，同比例）
# ============================================================
# 截图描述信息
screenshot_descriptions = [
    {
        'title': '截图一：登录页面',
        'desc': '用户通过输入4位房间号和用户名进行登录。\n'
                '界面特点：酒店背景图 + 毛玻璃效果输入框，\n'
                '「广科·未来酒店」品牌展示，金色「立即入住」按钮。\n'
                '支持「记住我的信息」复选框功能。',
        'tech': '技术点：半透明输入框 + 圆角胶囊形状 + 登录验证',
    },
    {
        'title': '截图二：首页（空调控制）',
        'desc': '主控页面，展示当前房间状态和空调控制面板。\n'
                '包含：空调开关、温度调节（16°C-30°C）、\n'
                '当前温度 vs 设定温度显示，加减按钮交互。',
        'tech': '技术点：@ObservedV2响应式状态 + AppStorage跨页同步',
    },
    {
        'title': '截图三：首页（场景模式 & 快捷服务）',
        'desc': '场景模式：明亮/柔和/阅读/温馨四种预设场景，\n'
                '一键切换灯光氛围。\n'
                '快捷服务：请勿打扰 + 清理房间请求。\n'
                '晚安模式：一键关闭所有灯光。',
        'tech': '技术点：Flex布局 + 选中态金色光晕阴影 + backdropBlur毛玻璃',
    },
    {
        'title': '截图四：灯光控制页面',
        'desc': '支持9路独立灯光控制 + 总开关。\n'
                '场景模式：明亮/柔和/阅读/温馨/睡眠五种模式。\n'
                '每个灯具有独立开关按钮，选中态有金色高亮效果。',
        'tech': '技术点：@State数组驱动 + @Builder函数 + ForEach渲染',
    },
    {
        'title': '截图五：窗帘 & 服务页面',
        'desc': '窗帘控制：布帘+窗纱独立控制，全开/全关/暂停。\n'
                '服务页面：请勿打扰开关、清理房间申请、\n'
                'SOS紧急求助按钮、退出登录功能。',
        'tech': '技术点：Navigation导航 + Tabs底部导航栏 + 跨页面状态同步',
    },
]

for idx, (img_file, info) in enumerate(zip(image_files, screenshot_descriptions)):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, DARK_BG)
    add_title_bar(slide, info['title'],
                  f'Page Screenshot {idx+1}/5  ——  {info["tech"]}')

    img_path = os.path.join(TUPIAN_DIR, img_file)

    # 左侧：图片展示（保持原始比例）
    # 读取图片实际尺寸来计算显示大小
    from PIL import Image
    try:
        pil_img = Image.open(img_path)
        img_w, img_h = pil_img.size
        # 计算等比例缩放后的大小（目标高度约5.2英寸）
        target_height = Inches(5.3)
        ratio = img_w / img_h
        target_width = target_height * ratio / Emu(914400)  # convert to inches

        # 限制最大宽度
        max_width = Inches(6.5)
        if target_width > Emu(int(max_width)):
            target_width = max_width
            target_height = Emu(int(max_width / ratio))

        pic = slide.shapes.add_picture(
            img_path,
            Inches(0.6), Inches(1.6),
            target_width, target_height
        )
    except ImportError:
        # 如果没有PIL，使用固定尺寸
        pic = slide.shapes.add_picture(
            img_path,
            Inches(0.6), Inches(1.6),
            Inches(4.0), Inches(5.3)
        )

    # 右侧：图片介绍
    # 描述卡片
    add_card(slide, Inches(7.5), Inches(1.7), Inches(5.2), Inches(4.8))

    add_text_box(slide, Inches(7.8), Inches(1.9), Inches(4.6), Inches(0.4),
                 '📱 页面介绍', font_size=Pt(20), bold=True, color=GOLD)

    add_text_box(slide, Inches(7.8), Inches(2.5), Inches(4.6), Inches(3.5),
                 info['desc'], font_size=Pt(15), color=WHITE)

    # 技术标签
    add_gold_line(slide, Inches(7.8), Inches(5.6), Inches(4.6), Pt(1))

    add_text_box(slide, Inches(7.8), Inches(5.75), Inches(4.6), Inches(0.5),
                 '🔧 ' + info['tech'], font_size=Pt(12), color=GOLD)

    # 页码标签
    add_text_box(slide, Inches(0.6), Inches(7.1), Inches(6), Inches(0.3),
                 f'截图 {idx+1}/{len(image_files)}  —  {os.path.basename(img_path)}',
                 font_size=Pt(10), color=ACCENT_GRAY)


# ============================================================
# Slide 10: 核心技术栈
# ============================================================
slide10 = prs.slides.add_slide(prs.slide_layouts[6])
set_slide_bg(slide10, DARK_BG)
add_title_bar(slide10, '项目技术栈', 'Technology Stack')

# 6个技术卡片 (3x2 网格布局)
tech_items = [
    ('HarmonyOS 6.0', '平台基础',
     '• 基于HarmonyOS NEXT SDK\n• API Version 21\n• ArkTS + ArkUI开发语言\n• 声明式UI编程范式'),
    ('MVVM架构', '设计模式',
     '• View: @ComponentV2装饰器\n• ViewModel: @ObservedV2类\n• Model: 纯数据结构定义\n• 数据驱动UI，单向数据流'),
    ('V2状态管理', '响应式编程',
     '• @ObservedV2 —— 可观察类\n• @Trace —— 属性级别追踪\n• @Local —— 组件内部状态\n• @Param/@Consumer —— 跨组件通信'),
    ('Navigation导航', '路由架构',
     '• Navigation + NavPathStack\n• NavigationMode.Auto自适应\n• @Builder PageMap路由映射\n• 支持页面栈管理与回退'),
    ('多设备三层架构', '工程化',
     '• Commons: 公共基础层\n• Features: 功能模块层(5个)\n• Products: 产品入口层\n• 手机/平板/折叠屏适配'),
    ('Mock数据 & API', '数据层',
     '• MockDataService模拟数据\n• 接口文档完整定义\n• RESTful API设计(4接口)\n• Bearer Token认证机制'),
]

for i, (title, subtitle, desc) in enumerate(tech_items):
    col = i % 3
    row = i // 3
    left = Inches(0.8 + col * 4.05)
    top = Inches(1.7 + row * 2.85)

    add_card(slide10, left, top, Inches(3.8), Inches(2.6))

    add_text_box(slide10, Inches(left.inches + 0.2), Inches(top.inches + 0.15),
                 Inches(3.4), Inches(0.4),
                 title, font_size=Pt(18), bold=True, color=GOLD)

    add_text_box(slide10, Inches(left.inches + 0.2), Inches(top.inches + 0.55),
                 Inches(3.4), Inches(0.3),
                 subtitle, font_size=Pt(11), color=ACCENT_GRAY)

    add_gold_line(slide10, Inches(left.inches + 0.2), Inches(top.inches + 0.85),
                  Inches(3.4), Pt(1))

    add_text_box(slide10, Inches(left.inches + 0.2), Inches(top.inches + 0.95),
                 Inches(3.4), Inches(1.5),
                 desc, font_size=Pt(12), color=WHITE)


# ============================================================
# Slide 11: 关键代码片段
# ============================================================
slide11 = prs.slides.add_slide(prs.slide_layouts[6])
set_slide_bg(slide11, DARK_BG)
add_title_bar(slide11, '关键代码实现', 'Key Code Implementation')

# 左侧：V2状态管理示例
add_card(slide11, Inches(0.5), Inches(1.7), Inches(6.0), Inches(5.5))
add_text_box(slide11, Inches(0.8), Inches(1.85), Inches(5.4), Inches(0.4),
             '📝 V2 响应式状态管理', font_size=Pt(16), bold=True, color=GOLD)

v2_code = '''// ViewModel 使用 @ObservedV2 实现响应式状态
@ObservedV2
export class HomeViewModel {
  @Trace roomState: RoomStateInfo = { ... };
  @Trace currentTemp: number = 22;
  @Trace targetTemp: number = 22;
  @Trace acOpen: boolean = false;
  @Trace acMode: number = 1;      // 制冷
  @Trace acSpeed: number = 1;     // 低风
  @Trace nightModeActive: boolean = false;

  toggleAirConditioner(): void {
    this.acOpen = !this.acOpen;   // 自动触发UI更新
    AppStorage.setOrCreate('airConditionerOn', this.acOpen);
  }

  adjustTemp(delta: number): void {
    const newTemp = this.targetTemp + delta;
    if (newTemp >= 16 && newTemp <= 30) {
      this.setAirConditionerTemp(newTemp);
    }
  }
}'''

txBox = slide11.shapes.add_textbox(Inches(0.8), Inches(2.4), Inches(5.4), Inches(4.5))
tf = txBox.text_frame
tf.word_wrap = True
for i, line in enumerate(v2_code.split('\n')):
    if i == 0:
        p = tf.paragraphs[0]
    else:
        p = tf.add_paragraph()
    p.text = line
    p.font.size = Pt(10)
    p.font.name = 'Consolas'
    p.space_after = Pt(0)
    p.space_before = Pt(0)
    if line.strip().startswith('//') or line.strip().startswith('*'):
        p.font.color.rgb = RGBColor(0x6A, 0x99, 0x5A)
    elif 'export' in line or '@ObservedV2' in line or '@Trace' in line:
        p.font.color.rgb = GOLD
    elif 'class' in line or 'function' in line or 'void' in line:
        p.font.color.rgb = RGBColor(0x56, 0x9C, 0xD6)
    elif line.strip().startswith('this.'):
        p.font.color.rgb = RGBColor(0xDC, 0xDC, 0xDC)
    else:
        p.font.color.rgb = WHITE

# 右侧：组件代码示例
add_card(slide11, Inches(6.8), Inches(1.7), Inches(6.0), Inches(5.5))
add_text_box(slide11, Inches(7.1), Inches(1.85), Inches(5.4), Inches(0.4),
             '📝 @ComponentV2 组件声明', font_size=Pt(16), bold=True, color=GOLD)

comp_code = '''// 组件使用 @ComponentV2 声明
@ComponentV2
export struct AirConditionerCard {
  @Local viewModel: HomeViewModel = new HomeViewModel();
  @Consumer() navPathStack: NavPathStack;

  @Builder
  ModeItem(text: string, icon: Resource) {
    Row({ space: 12 }) {
      Image(icon).width(28).height(28)
      Text(text).fontSize(14)
    }
    .border({
      width: this.currentSceneMode === text ? 4 : 0.5,
      color: this.currentSceneMode === text
        ? '#FFFFFF' : 'rgba(160, 125, 75, 0.25)'
    })
    .shadow(this.currentSceneMode === text
      ? { radius: 18, color: 'rgba(255, 190, 120, 0.6)' }
      : { radius: 0 }
    )
    .onClick(() => { this.viewModel.switchSceneMode(text); })
  }

  aboutToAppear(): void { this.viewModel.initRoomState(); }
}'''

txBox2 = slide11.shapes.add_textbox(Inches(7.1), Inches(2.4), Inches(5.4), Inches(4.5))
tf2 = txBox2.text_frame
tf2.word_wrap = True
for i, line in enumerate(comp_code.split('\n')):
    if i == 0:
        p = tf2.paragraphs[0]
    else:
        p = tf2.add_paragraph()
    p.text = line
    p.font.size = Pt(10)
    p.font.name = 'Consolas'
    p.space_after = Pt(0)
    p.space_before = Pt(0)
    if line.strip().startswith('//') or line.strip().startswith('*'):
        p.font.color.rgb = RGBColor(0x6A, 0x99, 0x5A)
    elif '@ComponentV2' in line or '@Builder' in line or '@Local' in line or '@Consumer' in line or 'export' in line:
        p.font.color.rgb = GOLD
    elif (line.strip().startswith('.border') or line.strip().startswith('.shadow')
          or line.strip().startswith('.onClick') or line.strip().startswith('?')):
        p.font.color.rgb = ACCENT_GRAY
    elif 'Image' in line or 'Text' in line or 'Row' in line:
        p.font.color.rgb = RGBColor(0x56, 0x9C, 0xD6)
    else:
        p.font.color.rgb = WHITE


# ============================================================
# Slide 12: 总结
# ============================================================
slide12 = prs.slides.add_slide(prs.slide_layouts[6])
set_slide_bg(slide12, DARK_BG)

add_gold_line(slide12, Inches(0), Inches(0), Inches(13.33), Pt(6))

add_text_box(slide12, Inches(1.5), Inches(1.2), Inches(10.3), Inches(0.8),
             '📋 项目总结', font_size=Pt(40), bold=True, color=GOLD,
             alignment=PP_ALIGN.CENTER)

add_gold_line(slide12, Inches(4.5), Inches(2.0), Inches(4.33), Pt(2))

# 总结卡片
add_card(slide12, Inches(1.5), Inches(2.5), Inches(10.3), Inches(4.2))

summary_points = [
    ('✅ 架构完整', '采用 MVVM 三层架构，View / ViewModel / Model 职责分离清晰，'
     '代码可维护性强，符合企业级开发规范。'),
    ('✅ 技术先进', '使用 HarmonyOS V2 响应式状态管理（@ObservedV2 / @Trace），'
     'Navigation 导航架构，支持声明式 UI 与高效渲染。'),
    ('✅ 多端适配', '基于多设备三层工程架构（commons / features / products），'
     '支持手机、平板、折叠屏三种设备形态。'),
    ('✅ 功能完备', '覆盖登录鉴权、空调控制、灯光场景管理、窗帘控制、'
     '客房服务五大功能模块，提供完整的智慧酒店体验。'),
    ('✅ 代码规范', '使用 Git 全程版本管理，Mock 数据开发模式，'
     '预留真实 API 接口对接能力，接口文档完整定义。'),
]

for i, (title, desc) in enumerate(summary_points):
    y = 2.7 + i * 0.78
    add_text_box(slide12, Inches(2.0), Inches(y), Inches(1.5), Inches(0.4),
                 title, font_size=Pt(16), bold=True, color=GOLD)
    add_text_box(slide12, Inches(3.6), Inches(y), Inches(7.8), Inches(0.65),
                 desc, font_size=Pt(13), color=WHITE)

# 底部
add_text_box(slide12, Inches(1.5), Inches(6.5), Inches(10.3), Inches(0.6),
             '感谢观看！',
             font_size=Pt(28), bold=True, color=LIGHT_GOLD, alignment=PP_ALIGN.CENTER)

add_gold_line(slide12, Inches(0), Inches(7.46), Inches(13.33), Pt(4))


# ============================================================
# 保存PPT
# ============================================================
prs.save(OUTPUT_PATH)
print('PPT generated successfully!')
print(f'Path: {OUTPUT_PATH}')
print(f'Total slides: {len(prs.slides)}')
print(f'Images used: {len(image_files)}')
for img in image_files:
    print(f'    - {img}')
