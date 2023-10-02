import { MantineTheme } from "@mantine/core";
import coreStyle from "@mantine/core/styles.css?inline";
import coreStyleLayer from "@mantine/core/styles.layer.css?inline";
import notificationStyle from "@mantine/notifications/styles.css?inline";
import notificationStyleLayer from "@mantine/notifications/styles.layer.css?inline";

export const ROOT = "root";
export const WINDOW_NAME = "_ymock_";
export const WINDOW_TITLE = "yMock dashboard";
export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;

/**
 * Add more styles by adding imported styles to this array.
 * Order will be preserved
 */
export const styles = [
  coreStyle,
  // coreStyleLayer,
  notificationStyle,
  // notificationStyleLayer
];

export const theme: Partial<MantineTheme> = {};
