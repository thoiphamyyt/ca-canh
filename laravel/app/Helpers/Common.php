<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Carbon\Carbon;

class Common
{

    public static function convert_number_to_words($number)
    {
        if ($number == 0) return 'Không đồng';

        $dictionary = [
            0 => 'không',
            1 => 'một',
            2 => 'hai',
            3 => 'ba',
            4 => 'bốn',
            5 => 'năm',
            6 => 'sáu',
            7 => 'bảy',
            8 => 'tám',
            9 => 'chín'
        ];

        $units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];

        // Xử lý phần số
        $number = (string) $number;
        $number = str_replace([',', ' '], '', $number);

        // Bỏ phần thập phân (nếu có)
        if (strpos($number, '.') !== false) {
            $number = explode('.', $number)[0];
        }

        $number = ltrim($number, '0');
        if ($number == '') return 'Không đồng';

        // Chia thành nhóm 3 số
        $groups = [];
        while (strlen($number) > 0) {
            $groups[] = substr($number, -3);
            $number = substr($number, 0, -3);
        }
        $groups = array_reverse($groups);

        $result = [];
        $groupCount = count($groups);

        foreach ($groups as $index => $group) {
            $group = str_pad($group, 3, '0', STR_PAD_LEFT);
            $hundreds = intval($group[0]);
            $tens = intval($group[1]);
            $ones = intval($group[2]);

            if ($group == '000') {
                continue; // bỏ qua nhóm 0
            }

            $groupWords = '';

            // Hàng trăm
            if ($hundreds > 0) {
                $groupWords .= $dictionary[$hundreds] . ' trăm';
                if ($tens == 0 && $ones > 0) $groupWords .= ' linh';
            }

            // Hàng chục + đơn vị
            if ($tens > 1) {
                $groupWords .= ' ' . $dictionary[$tens] . ' mươi';
                if ($ones == 1) $groupWords .= ' mốt';
                elseif ($ones == 4) $groupWords .= ' tư';
                elseif ($ones == 5) $groupWords .= ' lăm';
                elseif ($ones > 1) $groupWords .= ' ' . $dictionary[$ones];
            } elseif ($tens == 1) {
                $groupWords .= ' mười';
                if ($ones == 1) $groupWords .= ' một';
                elseif ($ones == 4) $groupWords .= ' tư';
                elseif ($ones == 5) $groupWords .= ' lăm';
                elseif ($ones > 1) $groupWords .= ' ' . $dictionary[$ones];
            } elseif ($tens == 0 && $hundreds == 0 && $ones > 0) {
                $groupWords .= $dictionary[$ones];
            } elseif ($tens == 0 && $ones > 0) {
                $groupWords .= ' ' . $dictionary[$ones];
            }

            // Gắn đơn vị
            $unitIndex = $groupCount - $index - 1;
            $groupWords .= ' ' . $units[$unitIndex];

            $result[] = trim($groupWords);
        }

        $final = trim(implode(' ', $result));
        $final = preg_replace('/\s+/', ' ', $final);
        $final = ucfirst($final) . ' đồng';

        return $final;
    }
    public static function slugify($str)
    {
        $str = mb_strtolower($str, 'UTF-8');

        $unicode = [
            'a' => 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ',
            'd' => 'đ',
            'e' => 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'i' => 'í|ì|ỉ|ĩ|ị',
            'o' => 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'u' => 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'y' => 'ý|ỳ|ỷ|ỹ|ỵ'
        ];

        foreach ($unicode as $non => $accent) {
            $str = preg_replace("/($accent)/i", $non, $str);
        }

        // Xóa ký tự đặc biệt
        $str = preg_replace('/[^a-z0-9\s-]/', '', $str);

        // Đổi khoảng trắng thành dấu -
        $str = preg_replace('/\s+/', '-', trim($str));

        return $str;
    }
}
