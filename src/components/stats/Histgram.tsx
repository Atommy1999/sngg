import { Center, Circle, HStack, Box, VStack, Text } from "native-base";

import { GameStats } from "../../lib/localStorage";
import { barColors } from "../../constants/colors"; //max 10

type Props = {
  gameStats: GameStats;
};

export function Histgram({ gameStats }: Props) {
  const sum = gameStats.winDistribution.reduce((sum, item) => sum + item, 0);
  const max_freq = Math.max(...gameStats.winDistribution);

  return (
    <Center>
      <HStack w="100%" pl={3} pr={5}>
        <VStack flexGrow={1} space={4} alignItems="space-around" w="50%">
          {gameStats.winDistribution.map((value, index) => (
            <ProgressBar
              key={index}
              freq={value}
              sum={sum}
              max_freq={max_freq}
              color={barColors[index]}
              label={index + 1}
            />
          ))}
        </VStack>
      </HStack>
    </Center>
  );
}

function ProgressBar({
  freq,
  sum,
  max_freq,
  color,
  label,
}: {
  freq: number;
  sum: number;
  max_freq?: number;
  color?: string;
  label: string | number;
}) {
  const width = max_freq ? (freq / max_freq) * 100 : (freq / sum) * 100; //%
  const barHeight = 4; //px
  const borderWidth = 4; //px
  const boxSize = 19; //px
  const circleSize = 14;
  const boxTop = (-1 * (boxSize - barHeight)) / 2;
  const circleTop = (-1 * (circleSize - barHeight)) / 2;
  const circleLeft = 100 / freq; //%

  return (
    <Box
      position="relative"
      top={2}
      h={`${barHeight}px`}
      w={`${width}%`}
      bgColor={color ? color : "amber.300"}
    >
      <Text position="absolute" top={-9} left={-12} bold italic>
        {label}
      </Text>
      {[...Array(freq - 1)].map((_, i) => (
        <Circle
          key={i}
          bgColor="gray.50"
          borderColor={color}
          borderWidth={`${borderWidth}px`}
          position="absolute"
          left={`${circleLeft * (i + 1)}%`}
          size={`${circleSize}px`}
          top={`${circleTop}px`}
        />
      ))}

      <Center
        bgColor="gray.50"
        borderColor={color}
        borderWidth={`${borderWidth}px`}
        borderRadius={3}
        position="absolute"
        size={`${boxSize}px`}
        right={`${-1 * boxSize}px`}
        top={`${boxTop}px`}
        _text={{
          fontWeight: "bold",
          color: "gray.900",
          textAlign: "center",
          fontSize: 12,
        }}
      >
        {freq}
      </Center>
    </Box>
  );
}