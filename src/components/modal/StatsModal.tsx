import React from "react";
import {
  Modal,
  Button,
  Text,
  Heading,
  Divider,
  HStack,
  VStack,
} from "native-base";

import { StatBar } from "../stats/StatBar";
import { Histgram } from "../stats/Histgram";
import { CountDown } from "../stats/CountDown";

import { GameStats } from "../../lib/localStorage";
import { tomorrow } from "../../lib/words";
import { shareStatus } from "../../lib/share";

interface Props {
  isOpen: boolean;
  onCloseStatsModal: () => void;
  gameStats: GameStats;
  guesses: string[];
  isGameLost: boolean;
  isGameWon: boolean;
  handleShare: () => void;
}

export const StatsModal = React.memo(function StatsModal({
  isOpen,
  onCloseStatsModal,
  gameStats,
  guesses,
  isGameLost,
  isGameWon,
  handleShare,
}: Props) {
  const onPressShare: any = (event: any) => {
    shareStatus(guesses, isGameLost);
    handleShare();
    event.target.blur();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseStatsModal}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header
          _text={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          成績
        </Modal.Header>
        <Modal.Body>
          <VStack space={5}>
            <StatBar gameStats={gameStats} />
            <Divider />
            <Heading fontSize={18}>正解までの回答数</Heading>
            <Histgram gameStats={gameStats} />
            <Divider mt={2} />
            {(isGameWon || isGameLost) && (
              <>
                <HStack justifyContent="space-around">
                  <VStack alignItems="center">
                    <Text fontSize={12}>次の問題まで</Text>
                    <CountDown ms={tomorrow} />
                  </VStack>
                  <Button
                    onFocus={onPressShare}
                    w="40%"
                    _text={{ fontWeight: "bold", fontSize: 20 }}
                  >
                    SHARE
                  </Button>
                </HStack>
              </>
            )}
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});
