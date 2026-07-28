// SPDX-License-Identifier: MIT
// Copyright (c) 2026 msf8 (https://github.com)

export function Name() {
    return "Red Square Alumix 68 Yotei";
}

export function VendorId() {
    return 0x0C45;
}

export function ProductId() {
    return [0x80A2];
}

export function Publisher() {
    return "msf8";
}

export function Size() {
    return [64, 5];
}

export function DefaultPosition() {
    return [0, 0];
}

export function DefaultScale() {
    return 1.0;
}

export function DeviceType() {
    return "keyboard";
}

export function Validate(endpoint) {
    return endpoint.interface === 2 &&
        endpoint.usage === 0x0061 &&
        endpoint.usage_page === 0xFF68 &&
        endpoint.collection === 0x0000;
}

export function ImageUrl() {
    return "https://raw.githubusercontent.com/msf8/Red_Square_Alumix_68_Yotei_SignalRGB_plugin/main/Red_Square_Alumix_68_Yotei.png";
}

export function ControllableParameters() {
    return [
        {
            property: "LightingMode",
            group: "lighting",
            label: "Lighting Mode",
            description: "Canvas uses the active SignalRGB effect. Forced uses one static color.",
            type: "combobox",
            values: ["Canvas", "Forced"],
            default: "Canvas"
        },
        {
            property: "forcedColor",
            group: "lighting",
            label: "Forced Color",
            description: "Static color used in Forced mode.",
            min: "0",
            max: "360",
            type: "color",
            default: "#009BDE"
        }
    ];
}

const LED_IDS = [
    0x00, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x5C, 0x67,
    0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x3C, 0x6A,
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x4C, 0x69,
    0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x5A, 0x6C,
    0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x57, 0x58, 0x59, 0x5B
];

const LED_NAMES = [
    "Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Insert",
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del",
    "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "Page Up",
    "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "Page Down",
    "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Right Ctrl", "Left Arrow", "Down Arrow", "Right Arrow"
];

const LED_POSITIONS = [
    [2, 0], [6, 0], [10, 0], [14, 0], [18, 0], [22, 0], [26, 0], [30, 0], [34, 0], [38, 0], [42, 0], [46, 0], [50, 0], [56, 0], [62, 0],
    [3, 1], [8, 1], [12, 1], [16, 1], [20, 1], [24, 1], [28, 1], [32, 1], [36, 1], [40, 1], [44, 1], [48, 1], [52, 1], [57, 1], [62, 1],
    [4, 2], [9, 2], [13, 2], [17, 2], [21, 2], [25, 2], [29, 2], [33, 2], [37, 2], [41, 2], [45, 2], [49, 2], [56, 2], [62, 2],
    [5, 3], [11, 3], [15, 3], [19, 3], [23, 3], [27, 3], [31, 3], [35, 3], [39, 3], [43, 3], [47, 3], [53, 3], [58, 3], [62, 3],
    [3, 4], [8, 4], [13, 4], [28, 4], [43, 4], [47, 4], [52, 4], [56, 4], [60, 4], [63, 4]
];

const PACKET_IDS = [
    [0x00, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x5C],
    [0x67, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C],
    [0x3C, 0x6A, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B],
    [0x4C, 0x69, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B],
    [0x5A, 0x6C, 0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x57, 0x58, 0x59, 0x5B]
];

const POSITION_BY_ID = {};

for (let index = 0; index < LED_IDS.length; index++) {
    POSITION_BY_ID[LED_IDS[index]] = LED_POSITIONS[index];
}

const FRAME_INTERVAL_MS = 40;
let lastFrameTime = 0;

export function Initialize() {
    device.setName("Red Square Alumix 68 Yotei");
    device.setSize([64, 5]);
    device.setControllableLeds(LED_NAMES, LED_POSITIONS);

    lastFrameTime = 0;
    device.pause(200);

    const identifyResult = rsqWrite([
        0xAA, 0x10, 0x30,
        0x00, 0x00, 0x00,
        0x01
    ]);

    if (identifyResult === 65) {
        device.read([0x00], 65, 500);
    }

    rsqWrite([0xAA, 0x1C, 0x38]);
    device.pause(500);

    rsqWrite([0xAA, 0x1C, 0x38]);
    device.pause(500);
}

export function Render() {
    const now = Date.now();

    if (now - lastFrameTime < FRAME_INTERVAL_MS) {
        return;
    }

    lastFrameTime = now;
    sendScreenFrame();
}

export function Shutdown() {
}

function sendScreenFrame() {
    const forced = LightingMode === "Forced"
        ? hexToRgb(forcedColor)
        : null;

    let offset = 0;

    for (let packetIndex = 0; packetIndex < PACKET_IDS.length; packetIndex++) {
        const ids = PACKET_IDS[packetIndex];
        const payload = new Array(64).fill(0);
        const isLast = packetIndex === PACKET_IDS.length - 1;

        payload[0] = 0xAA;
        payload[1] = 0x32;
        payload[2] = ids.length * 4;
        payload[3] = offset & 0xFF;
        payload[4] = (offset >> 8) & 0xFF;
        payload[5] = 0x00;
        payload[6] = isLast ? 0x01 : 0x00;
        payload[7] = 0x00;

        for (let index = 0; index < ids.length; index++) {
            const id = ids[index];
            const position = POSITION_BY_ID[id];

            if (!position) {
                device.log(
                    "Missing position for LED ID 0x" +
                    id.toString(16)
                );
                return;
            }

            const color = forced ||
                device.color(position[0], position[1]);

            const dataOffset = 8 + index * 4;

            payload[dataOffset] = id;
            payload[dataOffset + 1] = color[0];
            payload[dataOffset + 2] = color[1];
            payload[dataOffset + 3] = color[2];
        }

        const result = device.write(
            [0x00].concat(payload),
            65
        );

        if (result !== 65) {
            device.log(
                "Screen packet " +
                packetIndex +
                " write failed: " +
                result
            );
            return;
        }

        offset += ids.length * 4;
        device.pause(2);
    }
}

function rsqWrite(payload) {
    const packet = payload.slice(0, 64);

    while (packet.length < 64) {
        packet.push(0x00);
    }

    return device.write(
        [0x00].concat(packet),
        65
    );
}

function hexToRgb(hex) {
    const value = String(hex || "#000000")
        .replace("#", "")
        .padStart(6, "0")
        .slice(0, 6);

    return [
        parseInt(value.slice(0, 2), 16) || 0,
        parseInt(value.slice(2, 4), 16) || 0,
        parseInt(value.slice(4, 6), 16) || 0
    ];
}