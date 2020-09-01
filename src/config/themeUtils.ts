import {PixelRatio, Platform, Dimensions} from 'react-native';
import * as yup from 'yup'

export const HEADER_TYPE = {
  NORMAL: 'NORMAL',
  MAIN: 'MAIN',
  SEARCH: 'SEARCH',
  HEADER_SEARCH: 'HEADER_SEARCH'
};

export const MODAL_TYPE = {
  NORMAL: 'NORMAL',
  CHOICE: 'CHOICE',
};

export const COLOR = {
  PRIMARY_ACTIVE: '#6A961F',
  PRIMARY_YELLOW: '#EEC824',
  TEXT_DEFAULT: '#000000',
  LIGHT_GRAY: '#F6F6F6',
  WHITE: '#FFFFFF',
  PLACEHOLDER: '#666666',
  DEACTIVE_GRAY: '#9B9B9B',
  GREEN: '#27AE60',
  RED: '#EB5757',
  DARK_BLUE: '#22215B',
};

const {width, height} = Dimensions.get('window');
export const DEVICE_WIDTH = height > width ? width : height;
export const DEVICE_HEIGHT = height > width ? height : width;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 60 : 50;

export const relativeWidth = (num: number) => (DEVICE_WIDTH * num) / 100;
export const relativeHeight = (num: number) => (DEVICE_HEIGHT * num) / 100;

export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  let adjustedWidth = width * pixelDensity;
  let adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

export const responsiveFontSize = (fontSize: number) => {
  let divider = isTablet() ? 600 : 375;
  return Math.round((fontSize * DEVICE_WIDTH) / divider);
};

export const responsiveHeight = (height: number) => {
  if (!isTablet()) {
    return height;
  } else {
    return height + height * 0.25;
  }
};

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 667;
export const ratioW = DEVICE_WIDTH / DESIGN_WIDTH;
export const ratioH = DEVICE_HEIGHT / DESIGN_HEIGHT;
export const ratio = Math.min(ratioW, ratioH);

export const LEVEL_ITEMS = [
  {
    title: 'Dễ',
    code: 'easy',
    status: false
  },
  {
    title: 'Trung bình',
    code: 'normal',
    status: false
  },
  {
    title: 'Khó',
    code: 'hard',
    status: false
  }
]

export const CATEGORIES = [
  {
    title: 'Món Việt',
    code: 'vietfood',
    image:
      'https://www.qantas.com/content/travelinsider/en/explore/australia/new-south-wales/sydney/vietnamese-restaurants-food-in-cabramatta/_jcr_content/parsysTop/hero.img.full.medium.jpg/1561101957431.jpg',
    status: false
  },
  {
    title: 'Món Trung',
    code: 'chinafood',
    image:
      'https://images.chinahighlights.com/allpicture/2019/01/482fb1f829ce4e6496b94fea_894x596.jpg',
    status: false
  },
  {
    title: 'Món Hàn',
    code: 'koreafood',
    image:
      'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1100,c_fill,g_auto,h_619,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F181114130138-korean-food-2620014201204004k-jeonju-bibimbap.jpg',
    status: false
  },
  {
    title: 'Món Nhật',
    code: 'japanfood',
    image:
      'https://c4.wallpaperflare.com/wallpaper/762/417/270/sushi-plate-dish-wallpaper-preview.jpg',
    status: false
  },
  {
    title: 'Món Thái',
    code: 'thaifood',
    image:
      'https://www.bangkokairblog.com/wp-content/uploads/2017/10/OG-imagetom-yum-goong.jpg',
    status: false
  },
  {
    title: 'Món Âu',
    code: 'eurofood',
    image:
      'https://www.skinnytaste.com/wp-content/uploads/2020/03/Whole-Wheat-Spaghetti-9-500x500.jpg',
    status: false
  },
  {
    title: 'Đồ uống',
    code: 'drink',
    image:
      'https://media.npr.org/assets/img/2014/01/08/istock_000021309811small_wide-578d260088ae91587b73570982a13d8f711c78da-s800-c85.jpg',
    status: false
  },
  {
    title: 'Tráng miệng',
    code: 'dessert',
    image:
      'https://firstclasse.com.my/wp-content/uploads/2020/02/Classic-Afternoon-Tea-1-scaled-1920x2400.jpg',
    status: false
  }
]

export const TAB_TYPES = ['user', 'favorite', 'following']
export const MAX_COOKING_TIME = 1000
export const stepsSchema = yup.object({
  stt: yup.number(),
  making: yup.string().trim().required('* Vui lòng nhập bước thực hiện')
})

export const validationRecipeSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('* Vui lòng nhập tiêu đề')
    .max(255, 'Tiêu đề không được quá 255 kí tự'),
  ration: yup.string().trim().required('* Vui lòng nhập khẩu phần'),
  cookingTime: yup
    .number()
    .required('* Vui lòng nhập thời gian thực hiện')
    .min(1, 'Thời gian thực hiện nhiều hơn 0 phút')
    .max(
      MAX_COOKING_TIME,
      `Thời gian thực hiện không quá ${MAX_COOKING_TIME} phút`
    ),
  difficultLevel: yup.number().required('* Vui lòng chọn độ khó'),
  ingredients: yup
    .array()
    .required('* Vui lòng thêm ít nhất 1 nguyên liệu')
    .of(yup.string().trim().required('* Vui lòng nhập nguyên liệu')),
  steps: yup
    .array()
    .required('* Vui lòng thêm ít nhất 1 bước thực hiện')
    .of(stepsSchema),
  avatar: yup
    .string()
    .nullable()
    .required('* Vui chọn hình đại diện cho công thức')
})


