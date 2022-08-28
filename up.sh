#!/usr/bin/env bash

DOWNLOAD_PATH='/content/downloads'

DRIVE_NAME='gd'

DRIVE_PATH='test'

export RCLONE_RETRIES_SLEEP=10s

RETRY_NUM=3

FILE_PATH=$3
RELATIVE_PATH=${FILE_PATH#${DOWNLOAD_PATH}/}
TOP_PATH=${DOWNLOAD_PATH}/${RELATIVE_PATH%%/*}
RED_FONT_PREFIX="\033[31m"
LIGHT_GREEN_FONT_PREFIX="\033[1;32m"
YELLOW_FONT_PREFIX="\033[1;33m"
LIGHT_PURPLE_FONT_PREFIX="\033[1;35m"
FONT_COLOR_SUFFIX="\033[0m"
INFO="[${LIGHT_GREEN_FONT_PREFIX}INFO${FONT_COLOR_SUFFIX}]"
ERROR="[${RED_FONT_PREFIX}ERROR${FONT_COLOR_SUFFIX}]"
WARRING="[${YELLOW_FONT_PREFIX}WARRING${FONT_COLOR_SUFFIX}]"

TASK_INFO() {
    echo -e "
-------------------------- [${YELLOW_FONT_PREFIX}TASK INFO${FONT_COLOR_SUFFIX}] --------------------------
${LIGHT_PURPLE_FONT_PREFIX}Download path:${FONT_COLOR_SUFFIX} ${DOWNLOAD_PATH}
${LIGHT_PURPLE_FONT_PREFIX}File path:${FONT_COLOR_SUFFIX} ${FILE_PATH}
${LIGHT_PURPLE_FONT_PREFIX}Upload path:${FONT_COLOR_SUFFIX} ${UPLOAD_PATH}
${LIGHT_PURPLE_FONT_PREFIX}Remote path:${FONT_COLOR_SUFFIX} ${REMOTE_PATH}
-------------------------- [${YELLOW_FONT_PREFIX}TASK INFO${FONT_COLOR_SUFFIX}] --------------------------
"
}

CLEAN_UP() {
    [[ -n ${MIN_SIZE} || -n ${INCLUDE_FILE} || -n ${EXCLUDE_FILE} ]] && echo -e "${INFO} Clean up excluded files ..."
    [[ -n ${MIN_SIZE} ]] && rclone delete -v "${UPLOAD_PATH}" --max-size ${MIN_SIZE}
    [[ -n ${INCLUDE_FILE} ]] && rclone delete -v "${UPLOAD_PATH}" --exclude "*.{${INCLUDE_FILE}}"
    [[ -n ${EXCLUDE_FILE} ]] && rclone delete -v "${UPLOAD_PATH}" --include "*.{${EXCLUDE_FILE}}"
}

UPLOAD_FILE() {
    RETRY=0
    while [ ${RETRY} -le ${RETRY_NUM} ]; do
        [ ${RETRY} != 0 ] && (
            echo
            echo -e "$(date +"%m/%d %H:%M:%S") ${ERROR} Upload failed! Retry ${RETRY}/${RETRY_NUM} ..."
            echo
        )
        rclone move -v "${UPLOAD_PATH}" "${REMOTE_PATH}"
        RCLONE_EXIT_CODE=$?
        if [ ${RCLONE_EXIT_CODE} -eq 0 ]; then
            [ -e "${DOT_ARIA2_FILE}" ] && rm -vf "${DOT_ARIA2_FILE}"
            rclone rmdirs -v "${DOWNLOAD_PATH}" --leave-root
            echo -e "$(date +"%m/%d %H:%M:%S") ${INFO} Upload done: ${UPLOAD_PATH} -> ${REMOTE_PATH}"
            [ $LOG_PATH ] && echo -e "$(date +"%m/%d %H:%M:%S") [INFO] Upload done: ${UPLOAD_PATH} -> ${REMOTE_PATH}" >>${LOG_PATH}
            break
        else
            RETRY=$((${RETRY} + 1))
            [ ${RETRY} -gt ${RETRY_NUM} ] && (
                echo
                echo -e "$(date +"%m/%d %H:%M:%S") ${ERROR} Upload failed: ${UPLOAD_PATH}"
                [ $LOG_PATH ] && echo -e "$(date +"%m/%d %H:%M:%S") [ERROR] Upload failed: ${UPLOAD_PATH}" >>${LOG_PATH}
                echo
            )
            sleep 3
        fi
    done
}

UPLOAD() {
    echo -e "$(date +"%m/%d %H:%M:%S") ${INFO} Start upload..."
    TASK_INFO
    UPLOAD_FILE
}

if [ -z $2 ]; then
    echo && echo -e "${ERROR} This script can only be used by passing parameters through Aria2."
    echo && echo -e "${WARRING} 直接运行此脚本可能导致无法开机！"
    exit 1
elif [ $2 -eq 0 ]; then
    exit 0
fi

if [ -e "${FILE_PATH}.aria2" ]; then
    DOT_ARIA2_FILE="${FILE_PATH}.aria2"
elif [ -e "${TOP_PATH}.aria2" ]; then
    DOT_ARIA2_FILE="${TOP_PATH}.aria2"
fi

if [ "${TOP_PATH}" = "${FILE_PATH}" ] && [ $2 -eq 1 ]; then # 普通单文件下载，移动文件到设定的网盘文件夹。
    UPLOAD_PATH="${FILE_PATH}"
    REMOTE_PATH="${DRIVE_NAME}:${DRIVE_PATH}"
    UPLOAD
    exit 0
elif [ "${TOP_PATH}" != "${FILE_PATH}" ] && [ $2 -gt 1 ]; then # BT下载（文件夹内文件数大于1），移动整个文件夹到设定的网盘文件夹。
    UPLOAD_PATH="${TOP_PATH}"
    REMOTE_PATH="${DRIVE_NAME}:${DRIVE_PATH}/${RELATIVE_PATH%%/*}"
    CLEAN_UP
    UPLOAD
    exit 0
elif [ "${TOP_PATH}" != "${FILE_PATH}" ] && [ $2 -eq 1 ]; then # 第三方度盘工具下载（子文件夹或多级目录等情况下的单文件下载）、BT下载（文件夹内文件数等于1），移动文件到设定的网盘文件夹下的相同路径文件夹。
    UPLOAD_PATH="${FILE_PATH}"
    REMOTE_PATH="${DRIVE_NAME}:${DRIVE_PATH}/${RELATIVE_PATH%/*}"
    UPLOAD
    exit 0
fi

echo -e "${ERROR} Unknown error."
TASK_INFO
exit 1
