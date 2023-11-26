import { useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { NotifyOnChangeProps } from "@tanstack/query-core";

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
	const firstTimeRef = useRef(true);

	useFocusEffect(
		useCallback(() => {
			if (firstTimeRef.current) {
				firstTimeRef.current = false;
				return;
			}

			refetch();
		}, [refetch]),
	);
}

export function useFocusNotifyOnChangeProps(
	notifyOnChangeProps?: NotifyOnChangeProps,
) {
	const focusedRef = useRef(true);

	useFocusEffect(
		useCallback(() => {
			focusedRef.current = true;

			return () => {
				focusedRef.current = false;
			};
		}, []),
	);

	return () => {
		if (!focusedRef.current) {
			return [];
		}

		if (typeof notifyOnChangeProps === "function") {
			return notifyOnChangeProps();
		}

		// @ts-ignore
		return notifyOnChangeProps.current;
	};
}
