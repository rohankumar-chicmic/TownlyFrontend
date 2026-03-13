import { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

interface Options {
  hasChanges: boolean;
}

export default function useConfirmExit({ hasChanges }: Options) {
  const navigation = useNavigation();
  const [showExitModal, setShowExitModal] = useState(false);

  const pendingAction = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!hasChanges) return;

      e.preventDefault();

      pendingAction.current = e.data.action;
      setShowExitModal(true);
    });

    return unsubscribe;
  }, [navigation, hasChanges]);

  const confirmExit = () => {
    setShowExitModal(false);

    if (pendingAction.current) {
      navigation.dispatch(pendingAction.current);
    } else {
      navigation.goBack();
    }
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  return {
    showExitModal,
    confirmExit,
    cancelExit,
    setShowExitModal,
  };
}
