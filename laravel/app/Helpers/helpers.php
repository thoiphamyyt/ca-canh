<?php

if (! function_exists('api_dd')) {
    /**
     * Debug API response thay cho dd().
     *
     * @param  mixed  ...$vars
     * @return \Illuminate\Http\JsonResponse
     */
    function api_dd(...$vars)
    {
        // Lấy trace file + line
        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1)[0];

        return response()->json([
            '___DEBUG_API_DD___' => true,
            'file' => $trace['file'] ?? null,
            'line' => $trace['line'] ?? null,
            'data' => $vars,
        ], 200, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)->send();

        exit; // dừng hẳn như dd()
    }
}
