# Red Square Alumix 68 Yotei - SignalRGB plugin

Unofficial SignalRGB device plugin for the Red Square Alumix 68 Yotei keyboard.

## Features

- Per-key RGB control for all 68 LEDs
- SignalRGB Canvas effects
- Forced static color mode
- Approximately 25 FPS update rate
- Automatic return to the keyboard's onboard lighting after SignalRGB exits

## Compatibility

Tested with:

- Red Square Alumix 68 Yotei
- USB VID: `0C45`
- USB PID: `80A2`
- SignalRGB 2.5.74
- Windows 11

Other keyboard revisions have not been tested.

## Installation

1. Open SignalRGB.
2. Open the **Addons** or **Repositories** section.
3. Add the following repository URL:

   ```text
   https://github.com/msf8/Red_Square_Alumix_68_Yotei_SignalRGB_plugin
   ```

4. Allow SignalRGB to install the addon.
5. Restart SignalRGB if necessary.

## Known limitations

- The Fn key is handled internally by the keyboard firmware and does not produce a normal key event, so SignalRGB reactive effects cannot react to Fn presses.
- Caps Lock and Win Lock indicators are not preserved while direct RGB streaming is active.
- The plugin was tested only with hardware revision `0130`.
- The official Red Square configurator should not control the keyboard at the same time as SignalRGB.

## Technical details

The plugin communicates through HID interface 2:

- Usage page: `0xFF68`
- Usage: `0x0061`
- Collection: `0x0000`

Dynamic lighting uses command `0xAA 0x32` and five reports per frame.

## Disclaimer

This is an unofficial community project and is not affiliated with or endorsed by Red Square or SignalRGB.

Red Square and SignalRGB names and trademarks belong to their respective owners.

## License

The source code is licensed under the MIT License.
